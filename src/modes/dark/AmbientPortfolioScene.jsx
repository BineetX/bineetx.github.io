export default function AmbientPortfolioScene({ activeView }) {
  return <div className={`dark-ambient-scene css-only ambient-${activeView}`} aria-hidden="true" />;
}
