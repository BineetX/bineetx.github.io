import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AXES = [
  { label: 'Programming',      value: 72, color: '#4fc3f7' },
  { label: 'Bioinformatics',   value: 63, color: '#81c784' },
  { label: 'Comp. Biology',    value: 72, color: '#7e57c2' },
  { label: 'Machine Learning', value: 68, color: '#ff8a65' },
  { label: 'Creative Tools',   value: 81, color: '#f06292' },
]

const SIZE = 260
const CX = SIZE / 2
const CY = SIZE / 2
const R = 95
const LEVELS = 4

function polarToXY(angle, radius) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  }
}

function polygonPoints(values, scale = 1) {
  return values
    .map((v, i) => {
      const angle = (360 / values.length) * i
      const { x, y } = polarToXY(angle, (v / 100) * R * scale)
      return `${x},${y}`
    })
    .join(' ')
}

function RadarChart() {
  const n = AXES.length

  const gridPolygons = Array.from({ length: LEVELS }, (_, l) => {
    const frac = ((l + 1) / LEVELS) * R
    const pts = Array.from({ length: n }, (__, i) => {
      const angle = (360 / n) * i
      const { x, y } = polarToXY(angle, frac)
      return `${x},${y}`
    }).join(' ')
    return { pts, frac, idx: l }
  })

  const axisLines = AXES.map((_, i) => {
    const angle = (360 / n) * i
    const { x, y } = polarToXY(angle, R)
    return { x1: CX, y1: CY, x2: x, y2: y }
  })

  const labelPositions = AXES.map((ax, i) => {
    const angle = (360 / n) * i
    const { x, y } = polarToXY(angle, R + 26)
    return { ...ax, x, y }
  })

  const dataPoints = polygonPoints(AXES.map((a) => a.value))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <svg
        width={SIZE + 80}
        height={SIZE + 60}
        viewBox={`-40 -20 ${SIZE + 80} ${SIZE + 60}`}
        className="overflow-visible"
      >
        {/* Grid rings */}
        {gridPolygons.map(({ pts, idx }) => (
          <polygon
            key={idx}
            points={pts}
            fill="none"
            stroke="rgba(79, 195, 247, 0.12)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(79, 195, 247, 0.18)"
            strokeWidth="1"
          />
        ))}

        {/* Data fill */}
        <motion.polygon
          points={dataPoints}
          fill="rgba(79, 195, 247, 0.12)"
          stroke="#4fc3f7"
          strokeWidth="1.8"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Data dots */}
        {AXES.map((ax, i) => {
          const angle = (360 / n) * i
          const { x, y } = polarToXY(angle, (ax.value / 100) * R)
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r={4}
              fill={ax.color}
              stroke="#050d1a"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 }}
            />
          )
        })}

        {/* Labels */}
        {labelPositions.map((lp, i) => {
          const anchor = lp.x < CX - 5 ? 'end' : lp.x > CX + 5 ? 'start' : 'middle'
          return (
            <text
              key={i}
              x={lp.x} y={lp.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.04em"
              fill={lp.color}
            >
              {lp.label}
            </text>
          )
        })}

        {/* Percentage labels on grid rings */}
        {gridPolygons.map(({ frac, idx }) => (
          <text
            key={idx}
            x={CX + 3}
            y={CY - frac + 2}
            fontSize="8"
            fill="rgba(79, 195, 247, 0.4)"
          >
            {Math.round(((idx + 1) / LEVELS) * 100)}%
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-1">
        {AXES.map((ax) => (
          <div key={ax.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: ax.color }} />
            <span className="text-xs text-gray-400">{ax.label}: <span style={{ color: ax.color }} className="font-bold">{ax.value}%</span></span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default RadarChart
