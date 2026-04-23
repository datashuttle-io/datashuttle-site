/// Brand mark + optional wordmark with automatic dark-mode variant.
///
/// Renders both the light and dark SVG variants inline and lets CSS
/// toggle their `display` based on `[data-theme]` on the root element.
/// This avoids a React re-render when the theme flips and keeps the
/// logo pixel-perfect in each mode without any scripting.

interface Props {
  kind?: 'mark' | 'wordmark'
  height?: number | string
  className?: string
  alt?: string
}

export default function LogoMark({
  kind = 'mark',
  height = 22,
  className = '',
  alt = 'DataShuttle',
}: Props) {
  const base = kind === 'wordmark' ? '/brand/logo-wordmark' : '/brand/logo-mark'
  return (
    <span className={`ds-brand-mark ${className}`} aria-hidden={alt === ''}>
      <img src={`${base}.svg`} alt={alt} className="logo-light" style={{ height }} />
      <img src={`${base}-dark.svg`} alt={alt} className="logo-dark" style={{ height }} />
    </span>
  )
}
