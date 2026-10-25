import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = Number(process.env.PORT || 3000)
const mongoUri = process.env.MONGODB_URI
const resendApiKey = process.env.RESEND_API_KEY
const contactToEmail = process.env.CONTACT_TO_EMAIL
const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'Tunnu SI Contact <onboarding@resend.dev>'
const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const buildDirectory = path.resolve(currentDirectory, '../dist')

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    company: { type: String, trim: true, maxlength: 120, default: '' },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
  },
  { timestamps: true },
)

const ContactRequest = mongoose.model('ContactRequest', contactSchema)

app.disable('x-powered-by')
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_request, response) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1
  response.status(isDatabaseConnected ? 200 : 503).json({
    status: isDatabaseConnected ? 'ok' : 'degraded',
    database: isDatabaseConnected ? 'connected' : 'disconnected',
    email: resendApiKey && contactToEmail ? 'configured' : 'not_configured',
  })
})

async function sendContactNotification(contact) {
  if (!resendApiKey || !contactToEmail) {
    return { sent: false, reason: 'not_configured' }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: contact.email,
      subject: `Tunnu SI website inquiry from ${contact.name}`,
      text: [
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Company: ${contact.company || 'Not provided'}`,
        '',
        'Message:',
        contact.message,
      ].join('\n'),
    }),
  })

  if (!response.ok) {
    console.error(`Resend rejected a contact notification (HTTP ${response.status}).`)
    return { sent: false, reason: 'failed' }
  }

  return { sent: true, reason: 'sent' }
}

app.post('/api/contact', async (request, response) => {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      error: 'Contact requests are temporarily unavailable because the database is disconnected. Configure MONGODB_URI and restart the API.',
    })
  }

  const { name, email, company = '', message } = request.body ?? {}
  const fields = { name, email, company, message }

  for (const [field, value] of Object.entries(fields)) {
    if (typeof value !== 'string') {
      return response.status(400).json({ error: `Please provide a valid ${field}.` })
    }
  }

  const contact = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: company.trim(),
    message: message.trim(),
  }

  if (!contact.name || contact.name.length > 100) {
    return response.status(400).json({ error: 'Name must be between 1 and 100 characters.' })
  }
  if (contact.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return response.status(400).json({ error: 'Please provide a valid email address.' })
  }
  if (contact.company.length > 120) {
    return response.status(400).json({ error: 'Company must be 120 characters or fewer.' })
  }
  if (contact.message.length < 10 || contact.message.length > 2000) {
    return response.status(400).json({ error: 'Message must be between 10 and 2000 characters.' })
  }

  try {
    await ContactRequest.create(contact)
  } catch (error) {
    console.error('Unable to save contact request:', error)
    return response.status(503).json({ error: 'We couldn’t save your message right now. Please try again later.' })
  }

  let emailResult
  try {
    emailResult = await sendContactNotification(contact)
  } catch (error) {
    console.error('Unable to send contact notification:', error.message)
    emailResult = { sent: false, reason: 'failed' }
  }

  if (!emailResult.sent) {
    console.warn(`Contact request was saved, but email notification was ${emailResult.reason}.`)
  }

  return response.status(201).json({
    message: emailResult.sent
      ? 'Your message was saved and an email notification was sent.'
      : 'Your message was saved, but an email notification could not be sent.',
    emailSent: emailResult.sent,
    emailStatus: emailResult.reason,
  })
})

app.use(express.static(buildDirectory))

app.get(/^\/(?!api\/).*/, (_request, response, next) => {
  response.sendFile(path.join(buildDirectory, 'index.html'), (error) => {
    if (error) next(error)
  })
})

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && error.status === 400) {
    return response.status(400).json({ error: 'Request body must contain valid JSON.' })
  }

  console.error('API request failed:', error)
  return response.status(500).json({ error: 'An unexpected server error occurred.' })
})

async function start() {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, resolve)
    server.once('error', reject)
  })

  console.info(`Tunnu SI API listening on port ${port}.`)

  if (!mongoUri) {
    console.warn('MONGODB_URI is not configured; contact requests will be unavailable until MongoDB is configured.')
    return
  }

  mongoose.connect(mongoUri)
    .then(() => console.info('MongoDB connected.'))
    .catch((error) => console.error('Unable to connect to MongoDB; the API remains available:', error.message))
}

start().catch((error) => {
  console.error('Unable to start Tunnu SI API:', error)
  process.exitCode = 1
})
