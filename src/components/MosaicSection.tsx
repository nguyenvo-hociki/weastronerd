type MosaicSectionProps = {
  videos: string[];
};

export default function MosaicSection({ videos }: MosaicSectionProps) {
  return (
    <section className="section">
      <div className="mosaic">
        {videos.map((src, i) => (
          <div className="tile" key={i}>
            <video src={src} autoPlay muted loop playsInline />
            {i === 4 && <div className="center-title">A$TRONERD</div>}
          </div>
        ))}
      </div>
    </section>
  );
}