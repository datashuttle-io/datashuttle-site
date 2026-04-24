/// Marketing-site icon component.
///
/// Renders an SVG from /public/icons/*.svg as a CSS mask. The mask
/// picks up the SVG's painted alpha (strokes + fills), and we set
/// backgroundColor: currentColor so the icon adopts the surrounding
/// text color — works in both light and dark themes without shipping
/// two SVG variants.
///
/// The alternative (<img src=".../x.svg">) locks the fill/stroke to
/// whatever the SVG declares, so a `stroke="currentColor"` SVG inside
/// an <img> element renders as black (the <img> default color) and
/// vanishes on a dark background.

import type { CSSProperties } from 'react'

export interface IconProps {
  /// File name under /public/icons/ without extension.
  name: string
  /// Pixel size (square). Default 14.
  size?: number
  className?: string
  style?: CSSProperties
  title?: string
}

export function Icon({ name, size = 14, className, style, title }: IconProps) {
  const url = `/icons/${name}.svg`
  return (
    <span
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
    />
  )
}

export default Icon
