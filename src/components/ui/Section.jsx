import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {(eyebrow || title || intro) && (
          <div className="section-heading">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {intro && <p className="section-intro">{intro}</p>}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
