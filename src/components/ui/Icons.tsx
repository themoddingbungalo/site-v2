// Small inline SVG icons used across the site (lucide-style strokes).
interface IconProps { size?: number; className?: string; stroke?: string }

const strokeProps = (size: number, stroke: string, width = 2) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function DiscordIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.3 4.5A19.8 19.8 0 0 0 15.4 3l-.3.7c1.6.4 3 1 4.4 1.8-2.4-1.1-5-1.6-7.5-1.6s-5.1.5-7.5 1.6A17.6 17.6 0 0 1 8.9 3.7L8.6 3a19.8 19.8 0 0 0-4.9 1.5C1.2 8.3.4 12.4.7 16.5a19.9 19.9 0 0 0 6 3l.8-1.3c-1-.3-2-.8-2.8-1.4l.6-.4a14 14 0 0 0 11.4 0l.6.4c-.9.6-1.8 1-2.8 1.4l.8 1.3a19.8 19.8 0 0 0 6-3c.4-4.8-.8-8.9-2.9-12ZM8.4 14c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
    </svg>
  )
}

export function PencilIcon({ size = 16, className, stroke = 'currentColor' }: IconProps) {
  return (
    <svg {...strokeProps(size, stroke)} className={className} aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  )
}

export function DownloadIcon({ size = 18, className, stroke = 'currentColor' }: IconProps) {
  return (
    <svg {...strokeProps(size, stroke, 2.2)} className={className} aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function BookIcon({ size = 17, className, stroke = 'currentColor' }: IconProps) {
  return (
    <svg {...strokeProps(size, stroke)} className={className} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  )
}

export function InfoIcon({ size = 21, className, stroke = '#F0C070' }: IconProps) {
  return (
    <svg {...strokeProps(size, stroke, 2.2)} className={className} aria-hidden="true">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

export function SearchIcon({ size = 17, className, stroke = 'currentColor' }: IconProps) {
  return (
    <svg {...strokeProps(size, stroke, 2.2)} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.2" y2="16.2" />
    </svg>
  )
}

export function MenuIcon({ size = 18, className, stroke = 'currentColor' }: IconProps) {
  return (
    <svg {...strokeProps(size, stroke, 2.2)} className={className} aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function PlayIcon({ size = 22, className, fill = '#16191B' }: IconProps & { fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} className={className} aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

export function YouTubeIcon({ size = 17, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.6 12 3.6 12 3.6s-6.5 0-8.4.5A3 3 0 0 0 1.5 6.2C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12ZM9.8 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  )
}

export function KofiIcon({ size = 17, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 4h13.5a4.5 4.5 0 0 1 0 9H17v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4Zm13 7h.5a2.5 2.5 0 0 0 0-5H17v5Z" />
    </svg>
  )
}

/** Generic wrapper for the one-off lucide paths used by feature cards. */
export function StrokeIcon({ size = 20, stroke = '#D9A03C', className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg {...strokeProps(size, stroke)} className={className} aria-hidden="true">
      {children}
    </svg>
  )
}
