import { useEffect, useState } from 'react'

const LINES = [
  // Each: { id, d (path), delay, color }
  { id: 'a', delay: 0,    color: '#38bdf8' },
  { id: 'b', delay: 0.15, color: '#7dd3fc' },
  { id: 'c', delay: 0.3,  color: '#bae6fd' },
  { id: 'd', delay: 0.08, color: '#0ea5e9' },
  { id: 'e', delay: 0.22, color: '#38bdf8' },
]

// Generates a path that weaves across the SVG viewport
function makePath(seed, W, H) {
  const y0 = H * (0.2 + (seed * 0.137) % 0.6)
  const pts = []
  const steps = 8
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W
    // nudge y at each step with a pseudo-random offset
    const nudge = Math.sin(i * 1.7 + seed * 3.1) * H * 0.22
    pts.push([x, y0 + nudge])
  }
  const d = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`
    const [px, py] = pts[i - 1]
    const cx = ((px + x) / 2).toFixed(1)
    return `${acc} C ${cx} ${py.toFixed(1)}, ${cx} ${y.toFixed(1)}, ${x.toFixed(1)} ${y.toFixed(1)}`
  }, '')
  return d
}

export default function StorylineLoader({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // start exit after 2 s, unmount after fade (300 ms)
    const t1 = setTimeout(() => setExiting(true), 2000)
    const t2 = setTimeout(() => onDone(), 2350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  const W = 560
  const H = 160

  return (
    <div className={`sl-loader ${exiting ? 'sl-loader--exit' : ''}`}>
      <div className="sl-loader-inner">
        <svg
          className="sl-svg"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {LINES.map((line, i) => {
            const d = makePath(i * 1.618, W, H)
            const len = 1600
            return (
              <path
                key={line.id}
                d={d}
                stroke={line.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: len,
                  animation: `sl-draw 1.6s ${line.delay}s cubic-bezier(.4,0,.2,1) forwards`,
                }}
              />
            )
          })}
          {/* convergence dots */}
          {[0.3, 0.55, 0.78].map((xFrac, i) => (
            <circle
              key={i}
              cx={W * xFrac}
              cy={H / 2}
              r="4"
              fill="#0284c7"
              opacity="0"
              style={{
                animation: `sl-pop .3s ${0.6 + i * 0.25}s ease forwards`,
              }}
            />
          ))}
        </svg>

        <div className="sl-label">
          <span className="sl-label-main">Story<em>line</em></span>
          <span className="sl-label-sub">Survey</span>
        </div>
      </div>
    </div>
  )
}
