interface Props {
  id: string
  title: string
  className?: string
  /** Border radius override; the design uses 14px inline and 12px in grids. */
  radius?: number
}

export function YouTubeEmbed({ id, title, className = '', radius }: Props) {
  return (
    <div className={`video-frame ${className}`} style={radius ? { borderRadius: radius } : undefined}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
