import { useState } from "react";
import bgVideo from "../assets/video/motnguoinoi.mp4";
import CircularGallery from "../components/CircularGallery";

import img1 from "../assets/image/eddiep/song1-1.jpeg";
import img2 from "../assets/image/eddiep/song1-2.jpeg";
import img3 from "../assets/image/eddiep/song1-3.jpeg";
import img4 from "../assets/image/eddiep/song1-4.jpeg";
import img5 from "../assets/image/eddiep/song1-5.jpeg";
import img6 from "../assets/image/eddiep/song1-6.jpeg";
import img7 from "../assets/image/eddiep/song1-7.jpeg";

const spotifyLink = "https://open.spotify.com/track/4uR9uoGAuyOiC8yZVsIJCF";

const songs = [
  { artwork: img1 },
  { artwork: img2 },
  { artwork: img3 },
  { artwork: img4 },
  { artwork: img5 },
  { artwork: img6 },
  { artwork: img7 },
];

export default function EddieP() {
  const [showGallery, setShowGallery] = useState(false);
  const isMobile = window.innerWidth < 768;

  const items = songs.map((song) => ({
    image: song.artwork,
    text: "Mot Nguoi Noi.wav",
  }));

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div
        className={`absolute inset-0 transition-all duration-300 ${
          showGallery ? "bg-black/25 backdrop-blur-[20px]" : "bg-black/35"
        }`}
      />

      {showGallery && (
        <>
          <div className="absolute inset-0 z-20">
            <CircularGallery
              items={items}
              font="bold 44px Figtree"
              textColor="#ffffff"
              borderRadius={0.04}
              bend={isMobile ? 0.8 : 3}
            />
          </div>

          <a
            href={spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-30 z-30 -translate-x-1/2 rounded-full border border-white/40 bg-black/20 px-8 py-3 text-sm uppercase tracking-[0.3em] text-white/90 backdrop-blur-md transition hover:bg-white/20"
          >
            Listen on Spotify
          </a>
        </>
      )}

      <div className="absolute inset-x-0 bottom-4 md:bottom-8 z-30 flex justify-center px-4 md:px-6">
        <button
          type="button"
          onClick={() => setShowGallery((prev) => !prev)}
          className="w-full max-w-[220px] md:max-w-md rounded-[20px] md:rounded-[28px] border border-white/30 bg-black/30 px-4 md:px-8 py-2.5 md:py-5 text-center text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.35em] text-white backdrop-blur-xl transition hover:bg-white/25"
        >
          {showGallery ? "Hide Gallery" : "Show Gallery"}
        </button>
      </div>
    </section>
  );
}