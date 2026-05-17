import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { publications } from './informations'

const TAG_COLORS = {
  "Network Biology":   { bg: 'rgba(79,195,247,0.12)',  border: 'rgba(79,195,247,0.35)',  text: '#4fc3f7' },
  "Cancer":            { bg: 'rgba(240,98,146,0.12)',  border: 'rgba(240,98,146,0.35)',  text: '#f06292' },
  "Systems Biology":   { bg: 'rgba(126,87,194,0.12)', border: 'rgba(126,87,194,0.35)', text: '#7e57c2' },
  "Machine Learning":  { bg: 'rgba(129,199,132,0.12)',border: 'rgba(129,199,132,0.35)',text: '#81c784' },
  "Drug Discovery":    { bg: 'rgba(255,138,101,0.12)',border: 'rgba(255,138,101,0.35)',text: '#ff8a65' },
  "Transcriptomics":   { bg: 'rgba(79,195,247,0.12)', border: 'rgba(79,195,247,0.35)', text: '#4fc3f7' },
  "Bioinformatics":    { bg: 'rgba(126,87,194,0.12)', border: 'rgba(126,87,194,0.35)', text: '#7e57c2' },
  "DESeq2":            { bg: 'rgba(129,199,132,0.12)',border: 'rgba(129,199,132,0.35)',text: '#81c784' },
  default:             { bg: 'rgba(79,195,247,0.1)',  border: 'rgba(79,195,247,0.25)', text: '#4fc3f7' },
}

function tagStyle(tag) {
  return TAG_COLORS[tag] || TAG_COLORS.default
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function Publications() {
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a)
  const [activeYear, setActiveYear] = useState('All')

  const filtered = activeYear === 'All'
    ? publications
    : publications.filter((p) => p.year === activeYear)

  return (
    <div className="flex flex-col w-full px-4 py-6 gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="section-heading gradient-text-blue">Publications</h2>
        <p className="text-gray-400 text-sm mt-1">
          Peer-reviewed research in Computational Biology & Bioinformatics
        </p>
      </motion.div>

      {/* Year filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        {['All', ...years].map((y) => (
          <button
            key={y}
            onClick={() => setActiveYear(y)}
            className="px-4 py-1 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: activeYear === y ? 'rgba(79,195,247,0.2)' : 'rgba(10,22,40,0.6)',
              border: `1px solid ${activeYear === y ? 'rgba(79,195,247,0.6)' : 'rgba(79,195,247,0.15)'}`,
              color: activeYear === y ? '#4fc3f7' : '#9ca3af',
              fontSize: '0.75rem',
            }}
          >
            {y}
          </button>
        ))}
      </motion.div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          {filtered.map((pub, i) => (
            <motion.a
              key={pub.id}
              href={pub.doi}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="glass-card glass-card-hover rounded-xl p-4 group"
            >
              {/* Year badge + type */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className="badge text-xs"
                  style={{ background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.25)', color: '#4fc3f7' }}
                >
                  {pub.year}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{pub.type}</span>
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-gray-100 group-hover:text-sciblue transition-colors leading-snug mb-1">
                {pub.title}
              </h3>

              {/* Authors */}
              <p className="text-xs text-gray-400 mb-1 italic">{pub.authors}</p>

              {/* Journal */}
              <p className="text-xs font-medium mb-3" style={{ color: '#81c784' }}>
                {pub.journal}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {pub.tags.map((tag) => {
                  const s = tagStyle(tag)
                  return (
                    <span
                      key={tag}
                      className="badge"
                      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
                    >
                      {tag}
                    </span>
                  )
                })}
              </div>

              {/* Read link hint */}
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 group-hover:text-sciblue transition-colors">
                <span>View on Scholar</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Note */}
      <p className="text-center text-xs text-gray-600 italic">
        * Publication list may not be exhaustive. Visit{' '}
        <a href="https://scholar.google.com/citations?hl=en&user=9FZtto0AAAAJ" target="_blank" rel="noopener noreferrer" className="text-sciblue hover:underline">
          Google Scholar
        </a>{' '}
        for the full list.
      </p>
    </div>
  )
}

export default Publications
