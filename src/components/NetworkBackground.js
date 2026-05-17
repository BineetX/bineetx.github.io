import React, { useEffect, useRef } from 'react'

const NODE_COUNT = 55
const MAX_DIST = 140
const MOUSE_DIST = 110

function NetworkBackground({ opacity = 0.55 }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef(null)
  const nodesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1.2,
      alpha: Math.random() * 0.45 + 0.25,
      // Occasionally a "hub" node — bigger, brighter (like a hub protein)
      hub: Math.random() < 0.12,
    }))

    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onTouch = (e) => {
      if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const nodes = nodesRef.current
      const { x: mx, y: my } = mouseRef.current

      for (const node of nodes) {
        const dx = node.x - mx
        const dy = node.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < MOUSE_DIST && d > 0) {
          const force = ((MOUSE_DIST - d) / MOUSE_DIST) * 0.6
          node.vx += (dx / d) * force
          node.vy += (dy / d) * force
        }
        node.vx *= 0.975
        node.vy *= 0.975
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0) { node.vx = Math.abs(node.vx); node.x = 0 }
        if (node.x > width) { node.vx = -Math.abs(node.vx); node.x = width }
        if (node.y < 0) { node.vy = Math.abs(node.vy); node.y = 0 }
        if (node.y > height) { node.vy = -Math.abs(node.vy); node.y = height }
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const edgeAlpha = (1 - dist / MAX_DIST) * 0.28
            ctx.beginPath()
            ctx.strokeStyle = `rgba(79, 195, 247, ${edgeAlpha})`
            ctx.lineWidth = (nodes[i].hub || nodes[j].hub) ? 1.2 : 0.7
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const r = node.hub ? node.radius * 2.2 : node.radius
        const color = node.hub ? '129, 199, 132' : '79, 195, 247'

        // Outer glow
        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4)
        grd.addColorStop(0, `rgba(${color}, ${node.alpha * 0.4})`)
        grd.addColorStop(1, `rgba(${color}, 0)`)
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${node.alpha})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity,
      }}
    />
  )
}

export default NetworkBackground
