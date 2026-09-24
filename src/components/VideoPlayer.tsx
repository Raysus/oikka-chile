import { imageSrc, type VideoItem } from '../lib/api'

export function VideoPlayer({ video }: { video: VideoItem }) {
  const fileSrc = imageSrc(video.fileUrl)
  if (fileSrc) {
    return (
      <video controls playsInline preload="metadata" title={video.title}>
        <source src={fileSrc} />
      </video>
    )
  }
  if (video.youtubeId) {
    return (
      <iframe
        title={video.title}
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return null
}
