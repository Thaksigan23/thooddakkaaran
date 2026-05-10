import { useCallback, useState } from "react"

/**
 * Loads primary farm photo under /images/grow/, then optional alternate (e.g. .webp),
 * then fallback so the section works before originals are uploaded.
 */
export default function GrowSectionImage({
  primarySrc,
  alternateSrc,
  fallbackSrc,
  alt,
  className,
}) {
  const [src, setSrc] = useState(primarySrc)

  const onError = useCallback(() => {
    setSrc((current) => {
      if (current === primarySrc) return alternateSrc ?? fallbackSrc
      if (alternateSrc && current === alternateSrc) return fallbackSrc
      return current
    })
  }, [primarySrc, alternateSrc, fallbackSrc])

  return (
    <img
      src={src}
      alt={alt}
      onError={onError}
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}
