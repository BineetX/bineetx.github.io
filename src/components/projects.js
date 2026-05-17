import React from 'react'
import { motion } from 'framer-motion'
import { projects } from './informations'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const STATUS_STYLE = {
  Active:    { bg: 'rgba(129,199,132,0.15)', border: 'rgba(129,199,132,0.4)', text: '#81c784', dot: '#81c784' },
  Completed: { bg: 'rgba(79,195,247,0.12)',  border: 'rgba(79,195,247,0.3)',  text: '#4fc3f7', dot: '#4fc3f7' },
}

function Projects() {
  return (
    <div className="flex flex-col w-full px-4 py-6 gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="section-heading gradient-text-blue">Research & Projects</h2>
        <p className="text-gray-400 text-sm mt-1">
          Computational tools, pipelines, and academic outreach
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {projects.map((proj) => {
          const statusStyle = STATUS_STYLE[proj.status] || STATUS_STYLE.Active
          return (
            <motion.a
              key={proj.id}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="glass-card glass-card-hover rounded-xl p-5 flex flex-col group relative overflow-hidden"
              style={{ minHeight: '200px' }}
            >
              {/* Color accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                style={{ background: `linear-gradient(90deg, ${proj.color}, transparent)` }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: proj.color }}
                >
                  {proj.category}
                </span>
                {/* Status badge */}
                <span
                  className="badge"
                  style={{ background: statusStyle.bg, border: `1px solid ${statusStyle.border}`, color: statusStyle.text }}
                >
                  <span className="w-1.5 h-1.5 rounded-full mr-1" style={{ background: statusStyle.dot, display: 'inline-block' }} />
                  {proj.status}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-0.5 group-hover:transition-colors"
                style={{ color: proj.color }}
              >
                {proj.title}
              </h3>
              <p className="text-xs text-gray-400 italic mb-3">{proj.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed flex-1 mb-4">
                {proj.description}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5">
                {proj.tools.map((tool) => (
                  <span
                    key={tool}
                    className="badge"
                    style={{
                      background: `${proj.color}18`,
                      border: `1px solid ${proj.color}40`,
                      color: proj.color,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Arrow hint */}
              <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" style={{ color: proj.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          )
        })}
      </motion.div>

      <p className="text-center text-xs text-gray-600 italic">
        Visit{' '}
        <a href="https://github.com/BineetX" target="_blank" rel="noopener noreferrer" className="text-sciblue hover:underline">
          GitHub
        </a>{' '}
        for all repositories and open-source work.
      </p>
    </div>
  )
}

export default Projects
