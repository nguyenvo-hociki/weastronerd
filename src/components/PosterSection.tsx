import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

export default function PosterSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  // progress goes 0 -> 1 as you scroll down a small distance
  const [progress, setProgress] = useState(0);

  // how much scroll it takes to fully shrink
  
  const SHRINK_DISTANCE = 900; // px (adjust feel)

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }
  
  useEffect(() => {
    const onScroll = () => {
      const sectionTop = sectionRef.current?.offsetTop ?? 0;
      const y = window.scrollY;
      const localY = y - sectionTop;
      const p = clamp(localY / SHRINK_DISTANCE, 0, 1);
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Banner scaling: start 1.0 -> end 0.78
  const scale = 1 - progress * 0.2;
  
  const posterStyle = useMemo(
  () => ({
    transform: `scale(${scale})`,
    transformOrigin: "top center",
    transition: "transform 80ms linear",
    }),
    [scale]
  );

  // Click title: jump to about + force progress to 1 quickly
  const collapseNow = () => {

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef}>
      <div style={{ position: "sticky", top: 72, zIndex: 5 }}>
        <div className="poster" style={posterStyle}>
          <div className="poster-lines" />

          <div className="poster-content">
            <div className="poster-aboutus">Click to know about each of us:</div>

            <div className="arrow-wrap">
              <div className="poster-title" onClick={collapseNow} style={{ cursor: "pointer" }}>
                A$TRONERD <br />
                PRESENTS <br />
              </div>
              <svg className="title-big-arrow" viewBox="0 0 260 120" aria-hidden="true">
                <path
                  d="M200 90 C 200 150, 90 10, 70 100 C 45 75, 30 85, 15 95"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M15 95 L25 80 M15 95 L 32 105"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="poster-mid">
              
              <div className="pill-block">
                <div className="poster-pill">Kuala Lumpur, Malaysia</div>
                <div className="arrow-wrap">
                  <Link className="signature" to="/artists">Eddie.P</Link>
                  <svg className="arrow-svg arrow-sig arrow-eddie" viewBox="0 0 160 90" aria-hidden="true">
                    <path d="M10 70 C 45 78, 95 18, 140 35" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M140 35 L 126 28 M140 35 L 128 45" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div className="pill-block">
                <div className="poster-pill">Brisbane, Australia</div>
                <div className="arrow-wrap">
                  <Link className="signature" to="/artists">Julun</Link>
                  <svg className="arrow-svg arrow-sig arrow-julun" viewBox="0 0 160 90" aria-hidden="true">
                    <path d="M10 70 C 75 98, 95 18, 140 35" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M140 35 L 126 28 M140 35 L 128 45" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div className="pill-block">
                <div className="poster-pill">Texas, USA</div>
                <div className="arrow-wrap">
                  <Link className="signature" to="/artists">Kin6</Link>
                  <svg className="arrow-svg arrow-sig arrow-kin6" viewBox="0 0 160 90" aria-hidden="true">
                    <path d="M10 70 C 95 100, 95 38, 140 35" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M140 35 L 126 28 M140 35 L 128 45" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="pill-block">
                <div className="poster-pill">Vancouver, Canada</div>
                <div className="arrow-wrap">
                  <Link className="signature" to="/artists">Kkkuiii</Link>
                  <svg className="arrow-svg arrow-sig arrow-kkk" viewBox="0 0 160 90" aria-hidden="true">
                    <path d="M10 70 C 95 108, 75 38, 140 35" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M140 35 L 126 28 M140 35 L 128 45" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="poster-footer">
              <div className="poster-small">WEASTRONERD.COM</div>
              <div className="poster-big-right">SINCE 2024</div>
            </div>

          </div>
        </div>
      </div>

      {/*About us bellow */}
      <div className="poster-spacer" />
      <div className="about" ref={aboutRef} id="about">
        <h2>Who we are</h2>
        <p>
          Write our “About Us” here. This area will become visible as the banner
          shrinks while we scroll, like an Apple-style hero section.
        </p>
        <p>
         Add more paragraphs, member bios, links, etc. here later.
        </p>
      </div>

    </div>
  );
}
