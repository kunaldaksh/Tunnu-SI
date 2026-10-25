import { useEffect, useRef, useState } from 'react'
import './App.css'

const products = [
  {
    number: '01',
    name: 'Tunnu Docs',
    category: 'DOCUMENT MANAGEMENT',
    description:
      'Bring every file, conversation, and approval into one secure place your whole team can trust.',
    icon: 'document',
    tone: 'lavender',
  },
  {
    number: '02',
    name: 'Tunnu Ava',
    category: 'BUSINESS INTELLIGENCE',
    description:
      'Ask better questions of your business data and get clear answers, dashboards, and predictions.',
    icon: 'spark',
    tone: 'blue',
  },
  {
    number: '03',
    name: 'Tunnu Fusion',
    category: 'DOCUMENT PROCESSING',
    description:
      'Turn invoices, forms, and contracts into accurate, structured information—without the busywork.',
    icon: 'scan',
    tone: 'peach',
  },
  {
    number: '04',
    name: 'Tunnu Flow',
    category: 'WORKFLOW AUTOMATION',
    description:
      'Keep requests moving with clear ownership, timely approvals, and a reliable audit trail.',
    icon: 'flow',
    tone: 'mint',
  },
  {
    number: '05',
    name: 'Tunnu Vision',
    category: 'VIDEO ANALYTICS',
    description:
      'Turn existing cameras into an intelligent layer for safer, more responsive operations.',
    icon: 'eye',
    tone: 'lilac',
  },
]

const productDetails = {
  'tunnu-docs': {
    title: 'Tunnu Docs',
    eyebrow: 'DOCUMENT MANAGEMENT',
    description: 'Bring files, conversations, and approvals into one secure workspace your whole team can trust.',
    points: ['Find the right file with connected search', 'Keep versions, decisions, and context together', 'Share access with clear permissions'],
  },
  'tunnu-ava': {
    title: 'Tunnu Ava',
    eyebrow: 'BUSINESS INTELLIGENCE',
    description: 'Turn business data into clear answers, useful dashboards, and better-informed decisions.',
    points: ['Ask questions in plain language', 'Bring key metrics into one view', 'Spot patterns and changes sooner'],
  },
  'tunnu-fusion': {
    title: 'Tunnu Fusion',
    eyebrow: 'DOCUMENT PROCESSING',
    description: 'Transform invoices, forms, and contracts into accurate, structured information.',
    points: ['Extract the fields your team needs', 'Validate information before it moves on', 'Reduce manual entry and rework'],
  },
  'tunnu-flow': {
    title: 'Tunnu Flow',
    eyebrow: 'WORKFLOW AUTOMATION',
    description: 'Keep requests moving with clear ownership, timely approvals, and a reliable audit trail.',
    points: ['Route each task to the right owner', 'Make approvals and handoffs visible', 'Track progress from start to finish'],
  },
  'tunnu-vision': {
    title: 'Tunnu Vision',
    eyebrow: 'VIDEO ANALYTICS',
    description: 'Turn existing cameras into an intelligent layer for safer, more responsive operations.',
    points: ['Surface events that need attention', 'Use existing camera infrastructure', 'Help teams respond with better context'],
  },
}

const navigationGroups = [
  {
    label: 'Products',
    href: '/products',
    links: products.map((product) => ({
      title: product.name,
      description: product.category,
      href: `/products/${product.name.toLowerCase().replaceAll(' ', '-')}`,
    })),
  },
  {
    label: 'Solutions',
    href: '/solutions',
    links: [
      { title: 'Document intelligence', description: 'Find, understand, and organize information', href: '/solutions/document-intelligence' },
      { title: 'Workflow automation', description: 'Move requests and approvals forward', href: '/solutions/workflow-automation' },
      { title: 'Business intelligence', description: 'Make confident, data-informed decisions', href: '/solutions/business-intelligence' },
      { title: 'Visual operations', description: 'Bring better awareness to the real world', href: '/solutions/visual-operations' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    links: [
      { title: 'Manufacturing', description: 'Connect plant-floor and office workflows', href: '/industries/manufacturing' },
      { title: 'Banking & finance', description: 'Bring clarity to documents and decisions', href: '/industries/banking-finance' },
      { title: 'Government', description: 'Support accountable public services', href: '/industries/government' },
      { title: 'Pharma & life sciences', description: 'Structure complex, regulated information', href: '/industries/pharma-life-sciences' },
      { title: 'Retail & FMCG', description: 'Coordinate fast-moving operations', href: '/industries/retail-fmcg' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    links: [
      { title: 'FAQs', description: 'Answers to common questions', href: '/resources/faqs' },
      { title: 'Getting started', description: 'A practical guide to your first steps', href: '/resources/getting-started' },
      { title: 'Contact', description: 'Talk with the Tunnu SI team', href: '/resources/contact' },
    ],
  },
]

const pageDetails = {
  'document-intelligence': {
    title: 'Document intelligence',
    eyebrow: 'CONNECTED INFORMATION',
    description: 'Help your team find, understand, and act on information—without losing the context around it.',
    points: ['Centralize documents and conversations', 'Extract information from everyday files', 'Keep review and approval history connected'],
  },
  'workflow-automation': {
    title: 'Workflow automation',
    eyebrow: 'WORK THAT KEEPS MOVING',
    description: 'Design clear, accountable processes that move requests from intake to decision.',
    points: ['Route tasks by owner and next step', 'Keep approvals and exceptions visible', 'Measure progress across your workflows'],
  },
  'business-intelligence': {
    title: 'Business intelligence',
    eyebrow: 'ANSWERS FROM YOUR DATA',
    description: 'Bring business signals together so teams can see what is happening and decide what to do next.',
    points: ['Explore key measures in one place', 'Ask questions of connected data', 'Share a clearer picture with your team'],
  },
  'visual-operations': {
    title: 'Visual operations',
    eyebrow: 'AWARENESS IN THE REAL WORLD',
    description: 'Connect visual signals with operational context to help teams respond to what matters.',
    points: ['Use existing camera infrastructure', 'Surface activity for timely review', 'Connect observations to operational workflows'],
  },
  manufacturing: {
    title: 'Manufacturing',
    eyebrow: 'INDUSTRY SOLUTIONS',
    description: 'Bring production information, requests, and operational decisions into a more connected flow.',
    points: ['Coordinate maintenance and quality requests', 'Make procedures easier to find and follow', 'Connect operational documents and approvals'],
  },
  'banking-finance': {
    title: 'Banking & finance',
    eyebrow: 'INDUSTRY SOLUTIONS',
    description: 'Support document-heavy financial operations with structured information and visible workflows.',
    points: ['Organize customer and transaction documents', 'Automate review and approval handoffs', 'Give teams a clearer view of operations'],
  },
  government: {
    title: 'Government & public sector',
    eyebrow: 'INDUSTRY SOLUTIONS',
    description: 'Help public service teams manage information and decisions with accountability built in.',
    points: ['Make records and processes easier to navigate', 'Track approvals and responsibilities', 'Connect information across service workflows'],
  },
  'pharma-life-sciences': {
    title: 'Pharma & life sciences',
    eyebrow: 'INDUSTRY SOLUTIONS',
    description: 'Structure complex information and coordinate the reviews behind regulated work.',
    points: ['Organize research and quality documents', 'Make review steps and ownership visible', 'Keep operational context connected'],
  },
  'retail-fmcg': {
    title: 'Retail & FMCG',
    eyebrow: 'INDUSTRY SOLUTIONS',
    description: 'Give distributed teams a clearer way to manage requests, information, and day-to-day operations.',
    points: ['Standardize recurring operational workflows', 'Make current information easier to find', 'Coordinate decisions across locations'],
  },
  faqs: {
    title: 'Frequently asked questions',
    eyebrow: 'TUNNU SI RESOURCES',
    description: 'Learn how the Tunnu SI platform and product suite can support your team.',
    points: ['What is Tunnu SI?', 'Which products are included?', 'Can Tunnu SI connect with existing systems?'],
  },
  'getting-started': {
    title: 'Getting started',
    eyebrow: 'A PRACTICAL FIRST STEP',
    description: 'Start with one meaningful workflow, connect the information it needs, and grow from there.',
    points: ['Choose a process that creates friction today', 'Map the people, documents, and systems involved', 'Start small, learn, and expand with confidence'],
  },
  contact: {
    title: 'Talk with our team',
    eyebrow: 'LET’S MAKE WORK FEEL LIGHTER',
    description: 'Tell us what is slowing your team down. We’ll help you find a sensible place to begin.',
    points: ['Share your team’s goals and challenges', 'Explore the product or workflow that fits', 'Plan a practical next step together'],
  },
}

const questions = [
  {
    question: 'What is Tunnu SI?',
    answer:
      'Tunnu SI is an enterprise AI platform for managing documents, data, workflows, decisions, and visual operations. Its products help teams reduce repetitive work while staying connected to the systems they already use.',
  },
  {
    question: 'Which products are included in the suite?',
    answer:
      'The suite includes Tunnu Docs for document management, Tunnu Ava for business intelligence, Tunnu Fusion for document processing, Tunnu Flow for workflow automation, and Tunnu Vision for video analytics.',
  },
  {
    question: 'Can Tunnu SI connect with our existing systems?',
    answer:
      'Tunnu SI is designed to work alongside your existing applications and data sources. The right integration depends on your systems, security requirements, and the process you want to improve.',
  },
  {
    question: 'Can we start with just one product?',
    answer:
      'Yes. Start with the product that solves your most urgent challenge, then expand across the suite as your needs evolve.',
  },
]

const dashboardNavigation = [
  { name: 'Overview', icon: '⌂' },
  { name: 'Documents', icon: '▤' },
  { name: 'Pipelines', icon: '⌘' },
  { name: 'Approvals', icon: '✓' },
  { name: 'Analytics', icon: '▥' },
]

const dashboardViews = {
  Overview: {
    heading: 'Your operations, at a glance.',
    metrics: [
      ['Documents processed', '12,840', '↗ 18.4% this month'],
      ['Approval accuracy', '96.2%', '↗ 4.1% this month'],
      ['Hours given back', '428', 'Across your teams'],
    ],
    activity: 'Invoice processing',
    detail: 'INV-2048.pdf · Started 2 min ago',
    badge: 'IN PROGRESS',
    steps: ['Received', 'Extracted', 'Validated', 'Approved'],
    documents: [
      ['PDF', 'Vendor agreement', 'Approved'],
      ['PDF', 'Invoice #2048', 'In review'],
      ['XLS', 'Quarterly report', 'Processed'],
    ],
    chartTitle: 'Work, moving forward',
    chartDescription: 'Documents processed this week',
    change: '+32.8%',
  },
  Documents: {
    heading: 'Every document, in its place.',
    metrics: [
      ['Documents in library', '8,426', '↗ 126 added this week'],
      ['Waiting for review', '18', 'Across 6 teams'],
      ['Found in seconds', '99.8%', 'Search availability'],
    ],
    activity: 'Contract review',
    detail: 'Vendor agreement.pdf · Updated just now',
    badge: 'INDEXED',
    steps: ['Uploaded', 'Classified', 'Indexed', 'Shared'],
    documents: [
      ['PDF', 'Vendor agreement', 'Approved'],
      ['DOC', 'Service contract', 'In review'],
      ['PDF', 'Policy update', 'Processed'],
    ],
    chartTitle: 'Document activity',
    chartDescription: 'Files organized this week',
    change: '+18.6%',
  },
  Pipelines: {
    heading: 'Work keeps moving.',
    metrics: [
      ['Active pipelines', '24', 'Across 8 departments'],
      ['Tasks automated', '3,208', '↗ 12.2% this month'],
      ['On-time completion', '98.4%', 'Service-level target met'],
    ],
    activity: 'Invoice processing',
    detail: 'INV-2048.pdf · 3 of 4 steps complete',
    badge: 'RUNNING',
    steps: ['Received', 'Extracted', 'Validated', 'Approved'],
    documents: [
      ['PDF', 'Invoice intake', 'Running'],
      ['DOC', 'Contract renewal', 'In review'],
      ['XLS', 'Monthly close', 'Processed'],
    ],
    chartTitle: 'Pipeline throughput',
    chartDescription: 'Tasks completed this week',
    change: '+24.1%',
  },
  Approvals: {
    heading: 'The right decisions, on time.',
    metrics: [
      ['Awaiting approval', '12', '3 due today'],
      ['Average response', '2.4 hrs', '↘ 36 min faster'],
      ['Approved this month', '1,286', 'Across all teams'],
    ],
    activity: 'Purchase request',
    detail: 'PR-0816 · Awaiting finance review',
    badge: 'NEEDS REVIEW',
    steps: ['Submitted', 'Manager', 'Finance', 'Complete'],
    documents: [
      ['PDF', 'Purchase request', 'In review'],
      ['PDF', 'Vendor agreement', 'Approved'],
      ['DOC', 'Travel policy', 'Approved'],
    ],
    chartTitle: 'Approval activity',
    chartDescription: 'Decisions completed this week',
    change: '+11.3%',
  },
  Analytics: {
    heading: 'A clearer picture of progress.',
    metrics: [
      ['Work completed', '18,492', '↗ 21.5% this month'],
      ['Team efficiency', '91.7%', '↗ 6.2% this quarter'],
      ['Time returned', '1,024 hrs', 'Across all workflows'],
    ],
    activity: 'Monthly operations report',
    detail: 'October performance · Updated just now',
    badge: 'UP TO DATE',
    steps: ['Collect', 'Analyze', 'Review', 'Share'],
    documents: [
      ['XLS', 'Operations summary', 'Processed'],
      ['PDF', 'Team performance', 'Approved'],
      ['XLS', 'Monthly forecast', 'Processed'],
    ],
    chartTitle: 'Team productivity',
    chartDescription: 'Completed work this week',
    change: '+21.5%',
  },
}

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    document: <><path d="M7 3.75h7l4 4V20H7z" /><path d="M14 3.75v4h4M10 12h5M10 15.5h5" /></>,
    spark: <><path d="m12 3 1.75 5.25L19 10l-5.25 1.75L12 17l-1.75-5.25L5 10l5.25-1.75L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3" /><path d="M7 12h10M9 9h6m-6 6h6" /></>,
    flow: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="6" cy="18" r="2" /><path d="M8 6h3a3 3 0 0 1 3 3v0m0 6a3 3 0 0 1-3 3H8m6-6h2" /></>,
    eye: <><path d="M2.75 12s3.25-6 9.25-6 9.25 6 9.25 6-3.25 6-9.25 6-9.25-6-9.25-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.5 14.2A8 8 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function resolvePage(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return null

  const segments = path.split('/').filter(Boolean)
  const section = segments[0]
  const slug = segments[1]

  if (!slug) {
    const group = navigationGroups.find((item) => item.href === path)
    if (!group) return null
    return {
      title: `Explore ${group.label.toLowerCase()}`,
      eyebrow: `TUNNU SI ${group.label.toUpperCase()}`,
      description: {
        Products: 'A connected suite of practical AI tools for the work your team does every day.',
        Solutions: 'Explore ways to bring information, automation, and insight into your existing work.',
        Industries: 'See how connected information and workflows can support the realities of your industry.',
        Resources: 'Find useful answers and a clear next step for working with Tunnu SI.',
      }[group.label],
      points: [],
      links: group.links,
      section: group.label,
    }
  }

  const details = section === 'products' ? productDetails[slug] : pageDetails[slug]
  if (!details) return null
  const group = navigationGroups.find((item) => item.href === `/${section}`)
  return {
    ...details,
    section: group?.label || 'Resources',
    links: group?.links || [],
  }
}

function PageView({ page, navigate, navigateToContact }) {
  const handleLink = (event, href) => {
    event.preventDefault()
    navigate(href)
  }
  const titleWords = page.title.split(' ')
  const titleStart = titleWords.length > 1 ? `${titleWords.slice(0, -1).join(' ')} ` : ''

  return (
    <main className="detail-page">
      <section className="detail-hero">
        <div className="detail-hero-glow" />
        <div className="detail-hero-content">
          <a className="detail-breadcrumb" href={`/${page.section.toLowerCase()}`} onClick={(event) => handleLink(event, `/${page.section.toLowerCase()}`)}>
            <span>←</span> {page.section}
          </a>
          <div className="section-kicker">{page.eyebrow}</div>
          <h1>{titleStart}<span>{titleWords.at(-1)}</span></h1>
          <p>{page.description}</p>
          <div className="detail-hero-actions">
            <button className="button button-primary" type="button" onClick={navigateToContact}>Talk with our team <Icon name="arrow" size={16} /></button>
            <a className="button button-quiet" href="/" onClick={(event) => handleLink(event, '/')}>Back to home</a>
          </div>
        </div>
        <div className="detail-hero-art" aria-hidden="true">
          <div className="detail-art-orbit detail-art-orbit-one" />
          <div className="detail-art-orbit detail-art-orbit-two" />
          <div className="detail-art-core"><span>T</span><i /><i /><i /></div>
          <div className="detail-art-tag detail-art-tag-one"><Icon name="document" size={17} /> Information</div>
          <div className="detail-art-tag detail-art-tag-two"><Icon name="flow" size={17} /> In motion</div>
        </div>
      </section>

      {page.links?.length > 0 && (
        <section className="detail-content">
          <div className="detail-section-heading">
            <div className="section-kicker">{page.section.toUpperCase()} AT A GLANCE</div>
            <h2>{page.title.startsWith('Explore') ? 'Find the right place to start.' : `Explore more ${page.section.toLowerCase()}.`}</h2>
          </div>
          <div className="detail-link-grid">
            {page.links.map((link, index) => (
              <a className="detail-link-card" href={link.href} key={link.href} onClick={(event) => handleLink(event, link.href)}>
                <span className="detail-link-index">0{index + 1}</span>
                <strong>{link.title}</strong>
                <span>{link.description}</span>
                <i><Icon name="arrow" size={16} /></i>
              </a>
            ))}
          </div>
        </section>
      )}

      {page.points?.length > 0 && (
        <section className="detail-content detail-features">
          <div className="detail-section-heading">
            <div className="section-kicker">A BETTER WAY THROUGH</div>
            <h2>Make the next step <span>clear.</span></h2>
            <p>{page.title} helps teams turn everyday complexity into work they can move forward.</p>
          </div>
          <div className="detail-feature-grid">
            {page.points.map((point, index) => (
              <article className="detail-feature-card" key={point}>
                <span>0{index + 1}</span>
                <div className="detail-feature-icon"><Icon name={['document', 'flow', 'spark', 'check'][index % 4]} size={19} /></div>
                <h3>{point}</h3>
                <p>Bring people, information, and the next action together in one connected experience.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="detail-bottom-cta">
        <div className="section-kicker">START WITH WHAT MATTERS</div>
        <h2>Ready to make work <span>move better?</span></h2>
        <p>Let’s find the right place to begin for your team.</p>
        <button className="button button-light" type="button" onClick={navigateToContact}>Start a conversation <Icon name="arrow" size={16} /></button>
      </section>
    </main>
  )
}

function WorkflowDetails({ activeView, view }) {
  if (activeView === 'Documents') {
    return (
      <div className="document-flow">
        <div className="document-flow-file">
          <span className="file-icon">PDF</span>
          <span><strong>Vendor agreement.pdf</strong><small>12 pages · 2.4 MB</small></span>
          <span className="document-ready">READY</span>
        </div>
        <div className="extracted-fields">
          <span className="flow-caption">AI-EXTRACTED FIELDS</span>
          <div><span>Vendor</span><strong>Northstar Supply Co.</strong></div>
          <div><span>Contract value</span><strong>$24,800.00</strong></div>
          <div><span>Renewal date</span><strong>Oct 24, 2027</strong></div>
        </div>
        <div className="document-security"><Icon name="check" size={13} /><span>Version history and access controls are up to date</span></div>
      </div>
    )
  }

  if (activeView === 'Pipelines') {
    return (
      <div className="pipeline-builder">
        <div className="pipeline-trigger"><span className="builder-node-icon">↓</span><strong>New invoice received</strong><small>Trigger · AP inbox</small></div>
        <div className="builder-connector"><i /></div>
        <div className="pipeline-action-row">
          <div className="pipeline-action"><span className="builder-node-icon">▤</span><span><strong>Extract fields</strong><small>AI document reader</small></span><b>✓</b></div>
          <div className="pipeline-action"><span className="builder-node-icon">⌕</span><span><strong>Check policy</strong><small>Finance rules · 12 checks</small></span><b>✓</b></div>
          <div className="pipeline-action"><span className="builder-node-icon">↗</span><span><strong>Route for approval</strong><small>Manager → Finance</small></span><b className="node-wait">…</b></div>
        </div>
        <div className="pipeline-builder-footer"><span><i /> Workflow active</span><span>Last run 24 sec ago</span></div>
      </div>
    )
  }

  if (activeView === 'Approvals') {
    return (
      <div className="approval-flow">
        <div className="approval-summary"><strong>Purchase request <span>PR-0816</span></strong><span className="approval-amount">$8,450.00</span><small>New equipment · Submitted by Alex Morgan</small></div>
        <div className="approval-route">
          <div className="approval-person is-done"><span>AM</span><div><strong>Alex Morgan</strong><small>Submitted · 9:14 AM</small></div><b>✓</b></div>
          <div className="approval-person is-done"><span>JL</span><div><strong>Jamie Lee</strong><small>Manager approved · 9:32 AM</small></div><b>✓</b></div>
          <div className="approval-person is-current"><span>RK</span><div><strong>Riley Kim <i>YOUR TURN</i></strong><small>Finance review · Waiting 12 min</small></div><b>•••</b></div>
        </div>
        <div className="approval-actions"><span>Policy check passed · Under department limit</span><button type="button">Review request <Icon name="arrow" size={13} /></button></div>
      </div>
    )
  }

  if (activeView === 'Analytics') {
    return (
      <div className="analytics-flow">
        <div className="analytics-source"><span className="analytics-source-icon">↗</span><span><strong>October operations report</strong><small>8 teams · 4,216 completed tasks</small></span><span className="in-progress">UPDATED</span></div>
        <div className="analytics-insights">
          <article><span>FASTEST WORKFLOW</span><strong>Invoice review</strong><small>2.4 hours faster</small></article>
          <article><span>TOP IMPROVEMENT</span><strong>+21.5%</strong><small>Tasks completed</small></article>
          <article><span>TEAM CAPACITY</span><strong>+184 hrs</strong><small>Time returned this month</small></article>
        </div>
        <div className="analytics-conclusion"><Icon name="spark" size={14} /><span><strong>Insight:</strong> Automated invoice routing reduced average approval time by 31%.</span><a href="#contact">Explore <Icon name="arrow" size={12} /></a></div>
      </div>
    )
  }

  return (
    <div className="pipeline">
      {view.steps.map((step, index) => (
        <div className={`pipeline-step ${index < 2 ? 'done' : index === 2 ? 'current' : ''}`} key={step}>
          <span className="pipeline-dot">{index < 2 ? <Icon name="check" size={13} /> : index + 1}</span>
          <span>{step}</span>
        </div>
      ))}
      <div className="pipeline-line"><i /></div>
    </div>
  )
}

function DashboardPreview() {
  const [activeView, setActiveView] = useState('Overview')
  const [liveTick, setLiveTick] = useState(0)
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0)
  const view = dashboardViews[activeView]

  useEffect(() => {
    const liveInterval = window.setInterval(() => {
      setLiveTick((tick) => tick + 1)
      setSecondsSinceUpdate(0)
    }, 5000)
    const ageInterval = window.setInterval(() => {
      setSecondsSinceUpdate((seconds) => seconds + 1)
    }, 1000)

    return () => {
      window.clearInterval(liveInterval)
      window.clearInterval(ageInterval)
    }
  }, [])

  const updatedLabel = secondsSinceUpdate === 0
    ? 'Updated just now'
    : `Updated ${secondsSinceUpdate}s ago`

  return (
    <div className="dashboard-card" aria-label="Operations dashboard preview">
      <div className="dashboard-top">
        <div className="dashboard-brand">
          <span className="mini-mark">T</span>
          <span>Tunnu SI <span className="dashboard-muted">/ Workspace</span></span>
        </div>
        <div className="dashboard-live"><div className="dashboard-status"><i /> Live demo</div><span>{updatedLabel}</span></div>
      </div>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <span className="side-label">WORKSPACE</span>
          {dashboardNavigation.map((item) => (
            <button
              aria-pressed={activeView === item.name}
              className={`side-item ${activeView === item.name ? 'selected' : ''}`}
              key={item.name}
              onClick={() => {
                setActiveView(item.name)
                setSecondsSinceUpdate(0)
              }}
              type="button"
            >
              <span className="side-icon">{item.icon}</span>{item.name}
            </button>
          ))}
          <div className="usage-card">
            <span className="usage-label">MONTHLY CAPACITY</span>
            <strong>74% <small>used</small></strong>
            <div className="usage-track"><i /></div>
            <span className="usage-note">Plenty of room to grow</span>
          </div>
        </aside>
        <div className="dashboard-content" key={activeView}>
          <div className="dashboard-heading">
            <div>
              <div className="eyebrow">{activeView.toUpperCase()} · LIVE</div>
              <h3>{view.heading}</h3>
            </div>
            <span className="range-pill">Last 30 days</span>
          </div>
          <div className="metrics">
            {view.metrics.map(([label, value, detail], index) => (
              <article className="metric" key={label}>
                <span>{label}</span>
                <strong>{activeView === 'Overview' && index === 0 ? (12840 + liveTick).toLocaleString('en-US') : value}</strong>
                <small>{detail}</small>
              </article>
            ))}
          </div>
          <div className="activity-panel">
            <div className="panel-heading"><div><strong>{view.activity}</strong><span>{view.detail}</span></div><span className="in-progress">{view.badge}</span></div>
            <WorkflowDetails activeView={activeView} view={view} />
          </div>
          <div className="dashboard-bottom">
            <div className="recent-panel">
              <div className="panel-heading"><div><strong>Recent documents</strong><span>Your team's latest activity</span></div><a href="#products">View all <Icon name="arrow" size={13} /></a></div>
              {view.documents.map(([type, name, status]) => (
                <div className="recent-row" key={name}>
                  <span className={`file-icon ${type === 'XLS' ? 'sheet' : ''}`}>{type}</span>
                  <span>{name}</span>
                  <span className={status === 'In review' || status === 'Running' ? 'review' : 'approved'}>{status}</span>
                </div>
              ))}
            </div>
            <div className="chart-panel">
              <div className="panel-heading"><div><strong>{view.chartTitle}</strong><span>{view.chartDescription}</span></div></div>
              <div className="bars" aria-label="Weekly document processing trend">
                {[34, 49, 41, 64, 56, 79, 67, 92, 74, 100, 82, 93].map((height, index) => {
                  const liveHeight = Math.min(100, Math.max(20, height + ((liveTick + index) % 5) * 3 - 6))
                  return <i key={index} style={{ '--bar-height': `${liveHeight}%` }} />
                })}
              </div>
              <div className="chart-caption"><strong>{view.change}</strong><span>compared with last week</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState('')
  const [pagePath, setPagePath] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/')
  const [openQuestion, setOpenQuestion] = useState(0)
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('tunnu-si-theme') || window.localStorage.getItem('snohai-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navRef = useRef(null)
  const page = resolvePage(pagePath)

  const closeMenu = () => setMenuOpen(false)
  const navigate = (path) => {
    const normalizedPath = path.replace(/\/+$/, '') || '/'
    if (window.location.pathname !== normalizedPath) window.history.pushState({}, '', normalizedPath)
    setPagePath(normalizedPath)
    setOpenDropdown('')
    closeMenu()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const navigateToSection = (section) => {
    if (pagePath !== '/') {
      navigate('/')
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 50)
      return
    }
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    window.localStorage.setItem('tunnu-si-theme', theme)
    window.localStorage.removeItem('snohai-theme')
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#151915' : '#f7f6f2')
  }, [theme])

  useEffect(() => {
    const handlePopState = () => {
      setPagePath(window.location.pathname.replace(/\/+$/, '') || '/')
      setOpenDropdown('')
      closeMenu()
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const currentPage = resolvePage(pagePath)
    if (pagePath !== '/' && !currentPage) {
      window.history.replaceState({}, '', '/')
      document.title = 'Tunnu SI | Intelligent Workspace'
      return
    }
    document.title = currentPage ? `${currentPage.title} | Tunnu SI` : 'Tunnu SI | Intelligent Workspace'
    window.scrollTo({ top: 0 })
  }, [pagePath])

  useEffect(() => {
    if (!openDropdown) return undefined
    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setOpenDropdown('')
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpenDropdown('')
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openDropdown])

  async function handleContactSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setContactStatus({ type: '', message: '' })
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const result = await response.json()

      if (!response.ok) {
        setContactStatus({ type: 'error', message: result.error || 'We couldn’t send your message. Please try again.' })
        return
      }

      form.reset()
      setContactStatus({
        type: result.emailSent ? 'success' : 'warning',
        message: result.emailSent
          ? 'Your request is saved, and the notification email was sent.'
          : 'Your request is saved, but the notification email was not sent. Please check the email settings.',
      })
    } catch {
      setContactStatus({ type: 'error', message: 'We couldn’t reach the application server. Start it with “npm run dev” and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="site-shell" data-theme={theme}>
      <div className="announcement"><span className="announcement-dot" /> One intelligent workspace. A whole lot less busywork. <a href="/products" onClick={(event) => { event.preventDefault(); navigate('/products') }}>Meet the suite <Icon name="arrow" size={14} /></a></div>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Tunnu SI home" onClick={(event) => { event.preventDefault(); navigate('/') }}><span className="wordmark-icon">T</span><span>Tunnu <span>SI</span></span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav ref={navRef} className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navigationGroups.map((group) => (
            <div className={`nav-dropdown ${openDropdown === group.label ? 'is-open' : ''}`} key={group.label}>
              <button
                className="nav-dropdown-trigger"
                type="button"
                aria-expanded={openDropdown === group.label}
                aria-haspopup="true"
                onClick={() => setOpenDropdown(openDropdown === group.label ? '' : group.label)}
              >
                {group.label}<span className="nav-chevron">⌄</span>
              </button>
              <div className="nav-dropdown-menu">
                <a className="nav-dropdown-overview" href={group.href} onClick={(event) => { event.preventDefault(); navigate(group.href) }}>
                  <strong>Explore {group.label}</strong><span>See everything in {group.label.toLowerCase()} <Icon name="arrow" size={14} /></span>
                </a>
                {group.links.map((link) => (
                  <a className="nav-dropdown-link" href={link.href} key={link.href} onClick={(event) => { event.preventDefault(); navigate(link.href) }}>
                    <strong>{link.title}</strong><span>{link.description}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} /><span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button>
          <a className="header-cta" href={page ? '/resources/contact' : '#contact'} onClick={(event) => { if (page) { event.preventDefault(); navigate('/resources/contact') } }}>Let’s talk <Icon name="arrow" size={16} /></a>
        </div>
      </header>

      {page ? <PageView page={page} navigate={navigate} navigateToContact={() => navigateToSection('contact')} /> : <main>
        <section className="hero" id="home">
          <div className="hero-glow" />
          <div className="hero-content">
            <div className="hero-kicker"><span className="kicker-icon"><Icon name="spark" size={15} /></span> THE INTELLIGENT WORKSPACE</div>
            <h1>Make room for<br /><span>the work that matters.</span></h1>
            <p className="hero-description">Your documents, data, and decisions—working together at last. Meet the AI suite that makes everyday work feel a little less everyday.</p>
            <div className="hero-actions"><a className="button button-primary" href="#suite">Explore the suite <Icon name="arrow" size={17} /></a><a className="button button-quiet" href="#how-it-works"><span className="play-icon">▶</span> See how it works</a></div>
            <div className="hero-proof"><div className="avatar-stack"><span>O</span><span>M</span><span>A</span><span>+</span></div><span>Made for teams doing meaningful work</span><span className="proof-divider" /><div className="proof-stars">★★★★★</div><span>Built for the real world</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" />
            <div className="art-halo" />
            <svg className="art-ribbons" viewBox="0 0 540 500" fill="none">
              <ellipse cx="270" cy="246" rx="215" ry="86" transform="rotate(-32 270 246)" />
              <ellipse cx="270" cy="246" rx="190" ry="126" transform="rotate(28 270 246)" />
              <ellipse cx="270" cy="246" rx="153" ry="177" transform="rotate(63 270 246)" />
              <path d="M63 330c89-113 239-188 411-168" />
              <path d="M106 112c60 25 100 73 117 129" />
              <path d="M318 338c46-13 90-42 121-78" />
              <circle cx="104" cy="176" r="4" />
              <circle cx="445" cy="303" r="5" />
              <circle cx="356" cy="94" r="3" />
              <circle cx="187" cy="380" r="3" />
              <circle cx="421" cy="146" r="2" />
            </svg>
            <div className="ai-orbit-icon neural-orbit-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <path d="m9 11 10 7 12-7M9 11l3 18 7-11m0 0 8 13m4-20-5 20m-14-2 14 2" />
                <circle cx="9" cy="11" r="3" /><circle cx="31" cy="11" r="3" />
                <circle cx="19" cy="18" r="3.5" /><circle cx="12" cy="29" r="3" />
                <circle cx="27" cy="31" r="3" /><circle cx="31" cy="11" r="1" className="neural-core" />
                <circle cx="19" cy="18" r="1.2" className="neural-core" />
              </svg>
              <span>NEURAL / 01</span>
            </div>
            <div className="ai-orbit-icon signal-orbit-icon">
              <div className="signal-rings"><i /><i /><i /></div>
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M4 17h5l3-8 5 15 3-10 2 3h6" />
              </svg>
              <span>LIVE SIGNAL</span>
            </div>
            <div className="art-orbit-spark" />
            <div className="art-coordinate coordinate-top"><span>LAT. 37° 33′</span><i /></div>
            <div className="art-coordinate coordinate-bottom"><i /><span>CONNECTED / 05</span></div>
            <div className="art-float-card orbit-data-card">
              <span className="float-card-icon"><Icon name="spark" size={13} /></span>
              <span className="float-card-copy"><strong>Signals aligned</strong><small>All systems in sync</small></span>
              <i className="float-live-dot" />
            </div>
            <div className="art-float-card orbit-metric-card">
              <span className="metric-card-label">TEAM CAPACITY</span>
              <span className="metric-card-value">+28<span>%</span></span>
              <span className="metric-card-bars"><i /><i /><i /><i /><i /><i /><i /></span>
            </div>
            <div className="art-node-stack" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="art-bottom-note"><span>LEARN</span><i /><span>CONNECT</span><i /><span>IMPROVE</span></div>
            <div className="brand-monolith">
              <span className="monolith-plate plate-shadow" />
              <span className="monolith-plate plate-bottom" />
              <span className="monolith-plate plate-middle" />
              <span className="monolith-plate plate-top"><span>T</span></span>
            </div>
            <div className="art-orbit-label"><i /> IDEAS, CONNECTED</div>
            <div className="art-signature"><span>INTELLIGENCE IN MOTION</span><b>TUNNU SI <i>—</i> 01</b></div>
          </div>
          <a href="#dashboard" className="scroll-hint"><span className="scroll-mouse" /> Scroll to explore</a>
        </section>

        <section className="dashboard-section" id="dashboard">
          <div className="section-intro">
            <div className="section-kicker">A CLEARER VIEW OF WORK</div>
            <h2>Less chasing. More <span>moving forward.</span></h2>
            <p>From the first file to the final decision, get a better view of the work happening across your organization.</p>
          </div>
          <div className="dashboard-frame"><DashboardPreview /></div>
          <div className="dashboard-footnote"><span><i /> All your work, in sync</span><span>One connected workspace, built around your people.</span></div>
        </section>

        <section className="suite-section" id="suite">
          <div className="suite-heading">
            <div><div className="section-kicker">MEET YOUR NEW TEAMMATES</div><h2>Five smart ways to<br />make work <span>work better.</span></h2></div>
            <p>Start with what you need. Add what you need next. The Tunnu SI suite grows right alongside your goals.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className={`product-card ${product.tone}`} key={product.name}>
                <div className="product-card-top"><span className="product-icon"><Icon name={product.icon} size={21} /></span><span className="product-number">{product.number}</span></div>
                <div className="product-category">{product.category}</div>
                <h3><a href={`/products/${product.name.toLowerCase().replaceAll(' ', '-')}`} onClick={(event) => { event.preventDefault(); navigate(`/products/${product.name.toLowerCase().replaceAll(' ', '-')}`) }}>{product.name}</a></h3><p>{product.description}</p>
                <a href={`/products/${product.name.toLowerCase().replaceAll(' ', '-')}`} aria-label={`Learn more about ${product.name}`} onClick={(event) => { event.preventDefault(); navigate(`/products/${product.name.toLowerCase().replaceAll(' ', '-')}`) }} className="product-link"><Icon name="arrow" size={18} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="story-section" id="how-it-works">
          <div className="story-art">
            <div className="story-orbit orbit-a" /><div className="story-orbit orbit-b" />
            <div className="story-center"><span className="story-center-mark">s</span><strong>Your team</strong><small>right at the center</small></div>
            <div className="story-node node-one"><Icon name="document" size={17} /><span>Documents</span></div>
            <div className="story-node node-two"><Icon name="spark" size={17} /><span>Data</span></div>
            <div className="story-node node-three"><Icon name="flow" size={17} /><span>Workflows</span></div>
            <div className="story-node node-four"><Icon name="eye" size={17} /><span>Operations</span></div>
            <div className="story-sparkle">✳</div>
          </div>
          <div className="story-copy">
            <div className="section-kicker">BUILT TO FIT YOUR WORLD</div>
            <h2>AI that fits into<br />your work—not the<br /><span>other way around.</span></h2>
            <p>Your teams already have a way of working. Tunnu SI brings the right intelligence into the flow, connecting information and automating the handoffs that slow good work down.</p>
            <ul><li><span><Icon name="check" size={14} /></span>Start with the process that needs you most</li><li><span><Icon name="check" size={14} /></span>Connect the tools your teams already use</li><li><span><Icon name="check" size={14} /></span>Grow at a pace that feels right</li></ul>
            <a className="text-link" href="#contact">Find your starting point <Icon name="arrow" size={16} /></a>
          </div>
        </section>

        <section className="industries-section" id="industries">
          <div className="industries-copy"><div className="section-kicker">MADE FOR THE COMPLEX STUFF</div><h2>Real work.<br /><span>Real-world ready.</span></h2><p>From the factory floor to the finance team, bring clarity to the work that keeps your business moving.</p></div>
          <div className="industry-list">
            {navigationGroups.find((group) => group.label === 'Industries').links.map((industry, index) => (
              <a href={industry.href} key={industry.href} onClick={(event) => { event.preventDefault(); navigate(industry.href) }}><span>0{index + 1}</span> {industry.title} <b>↗</b></a>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-heading"><div className="section-kicker">GOOD QUESTIONS</div><h2>Curious? <span>Good.</span></h2><p>A few things people often ask before getting started.</p><a className="text-link" href="#contact">Still wondering? Talk to us <Icon name="arrow" size={16} /></a></div>
          <div className="faq-list">
            {questions.map((item, index) => (
              <article className={`faq-item ${openQuestion === index ? 'expanded' : ''}`} key={item.question}>
                <button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}><span className="faq-number">0{index + 1}</span><strong>{item.question}</strong><span className="faq-toggle">{openQuestion === index ? '−' : '+'}</span></button>
                {openQuestion === index && <p>{item.answer}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" />
          <div className="contact-content"><div className="section-kicker">READY WHEN YOU ARE</div><h2>Let’s make work<br /><span>feel a little lighter.</span></h2><p>Tell us what’s slowing your team down. We’ll help you find a smarter way through it.</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-fields">
                <label>Name<input name="name" autoComplete="name" required maxLength={100} /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
                <label className="company-field">Company <span>(optional)</span><input name="company" autoComplete="organization" maxLength={120} /></label>
                <label className="message-field">What would you like to improve?<textarea name="message" required minLength={10} maxLength={2000} rows={3} /></label>
              </div>
              <button className="button button-light" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Start a conversation'} <Icon name="arrow" size={17} /></button>
              <span className="contact-note">No big pitch. Just a good conversation.</span>
              {contactStatus.message && <p className={`form-status ${contactStatus.type}`} role="status">{contactStatus.message}</p>}
            </form>
          </div>
          <div className="contact-decoration"><div className="deco-ring ring-1" /><div className="deco-ring ring-2" /><div className="deco-ring ring-3" /><span>s</span><i className="deco-star star-1">✳</i><i className="deco-star star-2">✳</i></div>
        </section>
      </main>}

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="/" onClick={(event) => { event.preventDefault(); navigate('/') }}><span className="wordmark-icon">T</span><span>Tunnu <span>SI</span></span></a>
        <span className="footer-tagline">Better work starts with a little more intelligence.</span>
        <div className="footer-links">
          <a href="/products" onClick={(event) => { event.preventDefault(); navigate('/products') }}>Products</a>
          <a href="/industries" onClick={(event) => { event.preventDefault(); navigate('/industries') }}>Industries</a>
          <a href="/resources/faqs" onClick={(event) => { event.preventDefault(); navigate('/resources/faqs') }}>FAQs</a>
          <a href="/resources/contact" onClick={(event) => { event.preventDefault(); navigate('/resources/contact') }}>Contact</a>
        </div>
        <span className="copyright">© 2026 Tunnu SI. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default App
