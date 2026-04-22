import { useState, useMemo, useEffect, useCallback } from 'react'
import StorylineLoader from './StorylineLoader'
import './App.css'

// papers.json lives in public/ — edit data/papers.json then copy to app/public/papers.json
// This lets you refine the data without touching any React code.
const PAPERS_URL = import.meta.env.BASE_URL + 'papers.json'

// ─── Icons (inline SVG) ─────────────────────────────────────────────────────
const Icon = ({ name, size = 16 }) => {
  const icons = {
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    externalLink: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    copy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  }
  return icons[name] || null
}

// ─── Survey metadata (edit here) ────────────────────────────────────────────
const SURVEY = {
  titlePlain: 'The Story(line) So Far: A Survey on Storyline Visualization',
  authors: 'Sara Di Bartolomeo, Alexander Dobler, Velitchko Filipov, Martin Nöllenburg, Henry Ehlers',
  venue: 'EuroVis 2026',
  location: 'Nottingham, UK',
  journal: 'Computer Graphics Forum',
  abstract: `Storyline visualizations model narratives as temporal networks, using x-monotone lines to represent entities and their interactions over time. This technique offers an intuitive way to reveal structural patterns over time, such as character co-occurrence and narrative flow. Storylines represent a visualization approach with growing interest from the visualization community and applications in diverse contexts. Researchers have developed various layout algorithms and formalized a set of optimization objectives with the goal of automating their generation and balancing their readability, graph aesthetics, and efficiency. These methods vary in their algorithmic formulations and implementations as well as the visual elements they support, such as labels, grouping, or continuity preservation across time. This state-of-the-art report maps the current landscape of storyline visualization approaches, with a specific focus on the visual structures, optimization objectives, and the characteristic of the layout algorithms that generate these.`,
  bibtex: `@article{dibartolomeo2026storyline,
  title     = {The Story{\\textit{line}} So Far: A Survey on Storyline Visualization},
  author    = {Di Bartolomeo, Sara and Dobler, Alexander and Filipov, Velitchko
               and N{\\"{o}}llenburg, Martin and Ehlers, Henry},
  journal   = {Computer Graphics Forum},
  year      = {2026},
  publisher = {Wiley},
  note      = {Proc. EuroVis 2026, Nottingham, UK}
}`,
  repoUrl: 'https://github.com/velitchko/storyline-survey',
  contactEmail: 'sdb@ac.tuwien.ac.at',
}

// Renders the title with "line" in italics
const SurveyTitle = ({ className }) => (
  <span className={className}>
    The Story<em>line</em> So Far:{' '}
    <span style={{fontWeight: 600, opacity: .85}}>A Survey on Storyline Visualization</span>
  </span>
)

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getUnique = (field, paperList) => {
  const s = new Set()
  paperList.forEach(p => (p[field] || []).forEach(v => v && s.add(v)))
  return [...s].sort()
}

const FILTER_DEFS = [
  { key: 'domain',        label: 'Domain',         tagClass: 'tag-domain',   field: 'domain' },
  { key: 'methodType',    label: 'Method Type',    tagClass: 'tag-method',   field: 'methodType' },
  { key: 'evaluation',    label: 'Evaluation',     tagClass: 'tag-eval',     field: 'evaluation' },
  { key: 'temporalModel', label: 'Temporal Model', tagClass: 'tag-temporal', field: 'temporalModel' },
  { key: 'visualFeatures',label: 'Visual Features',tagClass: 'tag-visual',   field: 'visualFeatures' },
  { key: 'specialFeatures',label: 'Special Features', tagClass: 'tag-special', field: 'specialFeatures' },
]

// ─── BibTeX Modal ─────────────────────────────────────────────────────────────
function BibtexModal({ onClose }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(SURVEY.bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3><Icon name="book" size={14} style={{marginRight:6}}/> BibTeX Citation</h3>
          <button className="drawer-close" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>
        <div className="modal-body">
          <pre className="bibtex-code">{SURVEY.bibtex}</pre>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
          <button className={`btn btn-accent ${copied ? 'copied' : ''}`} onClick={copy}>
            <Icon name={copied ? 'check' : 'copy'} size={14}/>
            {copied ? 'Copied!' : 'Copy BibTeX'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Paper Drawer ─────────────────────────────────────────────────────────────
function PaperDrawer({ paper, onClose }) {
  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const tagGroups = [
    { label: 'Domain',            tags: paper.domain,              cls: 'tag-domain' },
    { label: 'Method Type',       tags: paper.methodType,          cls: 'tag-method' },
    { label: 'Evaluation',        tags: paper.evaluation,          cls: 'tag-eval' },
    { label: 'Temporal Model',    tags: paper.temporalModel,       cls: 'tag-temporal' },
    { label: 'Visual Features',   tags: paper.visualFeatures,      cls: 'tag-visual' },
    { label: 'Special Features',  tags: paper.specialFeatures,     cls: 'tag-special' },
    { label: 'Optimisation',      tags: paper.optimizationObjectives, cls: 'tag-obj' },
    { label: 'Constraints',       tags: paper.constraints,         cls: 'tag-obj' },
  ]

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose}/>
      <div className="drawer">
        <div className="drawer-header">
          <h2>{paper.title}</h2>
          <button className="drawer-close" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>
        <div className="drawer-body">

          <div className="drawer-section">
            <div className="drawer-section-title">Authors</div>
            <div className="drawer-authors">{paper.authors}</div>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">Publication</div>
            <div className="drawer-venue">{paper.venue} · {paper.year}</div>
            {paper.doi && <div className="drawer-doi" style={{marginTop:4}}>DOI: {paper.doi}</div>}
          </div>

          {paper.layoutDescription && (
            <div className="drawer-section">
              <div className="drawer-section-title">
                Layout Algorithm Description
                {paper.layoutFullyDescribed === 'Yes' && (
                  <span className="tag-described" style={{marginLeft:8}}>Fully described</span>
                )}
              </div>
              <div className="drawer-description">{paper.layoutDescription}</div>
            </div>
          )}

          {tagGroups.filter(g => g.tags && g.tags.length).map(g => (
            <div className="drawer-section" key={g.label}>
              <div className="drawer-section-title">{g.label}</div>
              <div className="paper-tags">
                {g.tags.map(t => <span key={t} className={`tag ${g.cls}`}>{t}</span>)}
              </div>
            </div>
          ))}

        </div>
        <div className="drawer-footer">
          {paper.url && (
            <a href={paper.url} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{flexShrink:0}}>
              <Icon name="externalLink" size={14}/> View Paper
            </a>
          )}
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  )
}

// ─── Tag pill (chip) ──────────────────────────────────────────────────────────
function TagPill({ label, cls }) {
  return <span className={`tag ${cls}`}>{label}</span>
}

// ─── Paper Card ───────────────────────────────────────────────────────────────
function PaperCard({ paper, listView, onClick }) {
  const primaryTags = [
    ...(paper.domain || []).slice(0,2).map(t => ({ t, cls: 'tag-domain' })),
    ...(paper.methodType || []).filter(t => t && t !== 'None').slice(0,1).map(t => ({ t, cls: 'tag-method' })),
    ...(paper.evaluation || []).slice(0,1).map(t => ({ t, cls: 'tag-eval' })),
    ...(paper.temporalModel || []).slice(0,1).map(t => ({ t, cls: 'tag-temporal' })),
  ]

  return (
    <div className={`paper-card ${listView ? 'list-view' : ''}`} onClick={onClick}>
      <div style={{flex:1, display:'flex', flexDirection:'column', gap:8, minWidth:0}}>
        <div className="paper-card-meta">
          <span className="paper-card-year">{paper.year}</span>
          <span className="paper-source-badge">{paper.source}</span>
        </div>
        <div className="paper-card-title">{paper.title}</div>
        <div className="paper-card-authors" style={{WebkitLineClamp:2, display:'-webkit-box', WebkitBoxOrient:'vertical', overflow:'hidden'}}>
          {paper.authors}
        </div>
        {paper.venue && <div className="paper-card-venue">{paper.venue}</div>}
        {primaryTags.length > 0 && (
          <div className="paper-tags">
            {primaryTags.map(({ t, cls }) => <TagPill key={t} label={t} cls={cls}/>)}
          </div>
        )}
      </div>
      <div className="paper-card-footer">
        <span style={{fontSize:'.75rem', color:'var(--text-muted)'}}>Click to explore</span>
        {paper.url && (
          <a href={paper.url} target="_blank" rel="noopener noreferrer"
             className="paper-link"
             onClick={e => e.stopPropagation()}>
            <Icon name="externalLink" size={12}/> DOI
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Sidebar filter section ───────────────────────────────────────────────────
function FilterSection({ def, options, active, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const LIMIT = 6
  const visible = expanded ? options : options.slice(0, LIMIT)
  const hasMore = options.length > LIMIT

  return (
    <div className="filter-group">
      <span className="filter-label">{def.label}</span>
      <div className="filter-options">
        {visible.map(opt => (
          <button
            key={opt}
            className={`filter-chip ${active.includes(opt) ? 'active' : ''}`}
            onClick={() => onChange(def.key, opt)}
          >
            {opt}
          </button>
        ))}
        {hasMore && (
          <button className="filter-chip-more" onClick={() => setExpanded(e => !e)}>
            {expanded ? '− less' : `+${options.length - LIMIT} more`}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Year range ───────────────────────────────────────────────────────────────
function YearFilter({ years, active, onChange }) {
  return (
    <div className="filter-group">
      <span className="filter-label">Year</span>
      <div className="filter-options">
        {years.map(y => (
          <button
            key={y}
            className={`filter-chip ${active.includes(y) ? 'active' : ''}`}
            onClick={() => onChange('year', y)}
          >{y}</button>
        ))}
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('year-desc')
  const [listView, setListView] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [showBibtex, setShowBibtex] = useState(false)

  useEffect(() => {
    fetch(PAPERS_URL)
      .then(r => r.json())
      .then(data => { setPapers(data); setLoading(false) })
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleFilter = useCallback((key, value) => {
    setFilters(prev => {
      const cur = prev[key] ? new Set(prev[key]) : new Set()
      cur.has(value) ? cur.delete(value) : cur.add(value)
      const next = { ...prev }
      if (cur.size === 0) delete next[key]
      else next[key] = cur
      return next
    })
  }, [])

  const clearFilters = () => { setFilters({}); setSearch('') }

  const allYears = useMemo(() => {
    const ys = new Set(papers.map(p => p.year).filter(Boolean))
    return [...ys].sort().reverse()
  }, [papers])

  const filterOptions = useMemo(() =>
    Object.fromEntries(FILTER_DEFS.map(d => [d.key, getUnique(d.field, papers)])),
    [papers]
  )

  const filtered = useMemo(() => {
    let list = papers
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.authors?.toLowerCase().includes(q) ||
        p.venue?.toLowerCase().includes(q) ||
        p.layoutDescription?.toLowerCase().includes(q)
      )
    }
    for (const [key, vals] of Object.entries(filters)) {
      if (!vals || vals.size === 0) continue
      if (key === 'year') {
        list = list.filter(p => vals.has(p.year))
      } else {
        const def = FILTER_DEFS.find(d => d.key === key)
        if (def) list = list.filter(p => (p[def.field] || []).some(v => vals.has(v)))
      }
    }
    list = [...list].sort((a, b) => {
      if (sortBy === 'year-desc') return (b.year || '0').localeCompare(a.year || '0')
      if (sortBy === 'year-asc')  return (a.year || '0').localeCompare(b.year || '0')
      if (sortBy === 'title')     return (a.title || '').localeCompare(b.title || '')
      return 0
    })
    return list
  }, [papers, search, filters, sortBy])

  const activeFilterList = useMemo(() => {
    const out = []
    for (const [key, vals] of Object.entries(filters)) {
      for (const v of vals) out.push({ key, value: v })
    }
    return out
  }, [filters])

  const stats = useMemo(() => {
    const yearSet = new Set(papers.map(p => p.year).filter(Boolean))
    const methodSet = new Set(papers.flatMap(p => p.methodType || []).filter(Boolean))
    const domainSet = new Set(papers.flatMap(p => p.domain || []).filter(Boolean))
    return { total: papers.length, years: yearSet.size, methods: methodSet.size, domains: domainSet.size }
  }, [papers])

  return (
    <>
      {showLoader && (
        <StorylineLoader onDone={() => setShowLoader(false)}/>
      )}

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="navbar-logo">
            <svg className="navbar-lines-icon" width="32" height="22" viewBox="0 0 32 22" fill="none" aria-hidden="true">
              <path d="M2 4 C8 4 8 11 14 11 L30 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 11 L14 11 C20 11 20 4 26 4 L30 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 18 L30 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="navbar-wordmark">
              Storyline <span className="navbar-wordmark-sub">Survey</span>
            </span>
          </div>
          <div className="navbar-right">
            <button
              className="theme-toggle"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15}/>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="hero-badge-dot"/>
              State-of-the-Art Report · EuroVis 2026
            </div>
            <h1><SurveyTitle/></h1>
            <div className="hero-meta">
              <div className="hero-authors">{SURVEY.authors}</div>
              <div className="hero-venue">
                <strong>{SURVEY.venue}</strong> · {SURVEY.location} ·{' '}
                <em>{SURVEY.journal}</em>
              </div>
            </div>
            <div className="hero-abstract">{SURVEY.abstract}</div>
            <div className="hero-actions">
              <button className="btn btn-hero-cite" onClick={() => setShowBibtex(true)}>
                <Icon name="copy" size={14}/> Cite this Survey
              </button>
              <a
                href={SURVEY.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Icon name="github" size={14}/> GitHub
              </a>
              <a href={`mailto:${SURVEY.contactEmail}`} className="btn btn-outline">
                <Icon name="mail" size={14}/> Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-label">Papers</span>
          </div>
          <div className="stat">
            <span className="stat-num">{stats.years}</span>
            <span className="stat-label">Years Covered</span>
          </div>
          <div className="stat">
            <span className="stat-num">{stats.methods}</span>
            <span className="stat-label">Algorithm Types</span>
          </div>
          <div className="stat">
            <span className="stat-num">{stats.domains}</span>
            <span className="stat-label">Application Domains</span>
          </div>
        </div>
      </div>

      {/* ── App body ───────────────────────────────────────────── */}
      <div className="app-body">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Search</div>
            <div className="search-box">
              <span className="search-icon"><Icon name="search" size={13}/></span>
              <input
                type="text"
                placeholder="Title, authors, venue…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Year</div>
            <YearFilter
              years={allYears}
              active={filters.year ? [...filters.year] : []}
              onChange={toggleFilter}
            />
          </div>

          {FILTER_DEFS.map(def => (
            <div className="sidebar-section" key={def.key}>
              <div className="sidebar-title">{def.label}</div>
              <FilterSection
                def={def}
                options={filterOptions[def.key] || []}
                active={filters[def.key] ? [...filters[def.key]] : []}
                onChange={toggleFilter}
              />
            </div>
          ))}

          {(Object.keys(filters).length > 0 || search) && (
            <div className="sidebar-section">
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="main-content">
          <div className="top-bar">
            <div className="results-count">
              <strong>{filtered.length}</strong> of {papers.length} papers
            </div>
            <div className="view-sort">
              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="year-desc">Newest first</option>
                <option value="year-asc">Oldest first</option>
                <option value="title">Title A–Z</option>
              </select>
              <div className="view-toggle">
                <button
                  className={!listView ? 'active' : ''}
                  onClick={() => setListView(false)}
                  title="Grid view"
                >
                  <Icon name="grid" size={14}/>
                </button>
                <button
                  className={listView ? 'active' : ''}
                  onClick={() => setListView(true)}
                  title="List view"
                >
                  <Icon name="list" size={14}/>
                </button>
              </div>
            </div>
          </div>

          {activeFilterList.length > 0 && (
            <div className="active-filters">
              <span className="active-filter-label">Active:</span>
              {activeFilterList.map(({ key, value }) => (
                <span key={`${key}-${value}`} className="active-filter-tag">
                  {value}
                  <button onClick={() => toggleFilter(key, value)}>
                    <Icon name="x" size={10}/>
                  </button>
                </span>
              ))}
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <div className="empty-state-icon" style={{animation:'spin 1s linear infinite'}}>
                <Icon name="search" size={22}/>
              </div>
              <h3>Loading papers…</h3>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Icon name="search" size={22}/></div>
              <h3>No papers match</h3>
              <p>Try adjusting your search or clearing some filters.</p>
            </div>
          ) : (
            <div className={listView ? 'papers-list' : 'papers-grid'}>
              {filtered.map(p => (
                <PaperCard
                  key={p.doi || p.title}
                  paper={p}
                  listView={listView}
                  onClick={() => setSelectedPaper(p)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-copy">
              <strong>The Story<em>line</em> So Far: A Survey on Storyline Visualization</strong>
              {SURVEY.authors}
              <br/>
              <span style={{fontSize:'.78rem'}}>{SURVEY.venue} · {SURVEY.location} · {SURVEY.journal}</span>
            </div>
            <div className="footer-links">
              <span className="footer-badge">
                <Icon name="book" size={13}/> {SURVEY.venue}
              </span>
              <a
                href={SURVEY.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <Icon name="github" size={14}/> Repository
              </a>
              <a href={`mailto:${SURVEY.contactEmail}`} className="footer-link">
                <Icon name="mail" size={14}/> {SURVEY.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {selectedPaper && (
        <PaperDrawer paper={selectedPaper} onClose={() => setSelectedPaper(null)}/>
      )}
      {showBibtex && (
        <BibtexModal onClose={() => setShowBibtex(false)}/>
      )}
    </>
  )
}
