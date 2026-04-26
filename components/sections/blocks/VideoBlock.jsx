export default function VideoBlock({ data }) {
  return (
    <div className="my-12 group">
      <div className="relative aspect-video w-full border border-text/10 bg-neutral-900 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/40 z-10" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/40 z-10" />

        <iframe
          src={`https://www.youtube.com/embed/${data.videoId}`}
          title={data.title || "MOKM Program Video"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {data.caption && (
        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-text/40 text-center font-mono">
          {data.caption}
        </p>
      )}
    </div>
  );
}
