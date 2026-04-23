import v1 from "../assets/mosaic/1.mp4";
import v2 from "../assets/mosaic/2.mp4";
import v3 from "../assets/mosaic/3.mp4";
import v4 from "../assets/mosaic/4.mp4";
import v5 from "../assets/mosaic/5.mp4";
import v6 from "../assets/mosaic/6.mp4";
import v7 from "../assets/mosaic/7.mp4";
import v8 from "../assets/mosaic/8.mp4";
import v9 from "../assets/mosaic/9.mp4";
import PosterSection from "../components/PosterSection";
import MosaicSection from "../components/MosaicSection";
import MobileSearchBar from "../components/MobileSearchBar";
import SocialRail from "../components/SocialRail";

export default function Home() {
  const videos = [v1, v2, v3, v4, v5, v6, v7, v8, v9];

  return (
    <main className="home">
      <MosaicSection videos={videos} />
      
      <MobileSearchBar />

      <section style={{ background: "#000" }}>
        <PosterSection />

        <SocialRail />
      </section>
    </main>
  );
}