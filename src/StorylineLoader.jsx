import { useEffect, useState } from 'react'

export default function StorylineLoader({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2000)
    const t2 = setTimeout(() => onDone(), 2350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`sl-loader ${exiting ? 'sl-loader--exit' : ''}`}>
      <div className="sl-loader-inner">
        <svg
          className="sl-svg"
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 30 C150 30 200 10 300 10 L420 10 C520 10 520 50 620 50 L750 50 C850 50 850 30 1000 30"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: 1200,
              animation: 'sl-draw 1.8s 0s cubic-bezier(.4,0,.2,1) forwards',
            }}
          />
        </svg>
        <div className="sl-label">
          <span className="sl-label-main">Story<em>line</em></span>
          <span className="sl-label-sub">Survey</span>
        </div>
      </div>
    </div>
  )
}
