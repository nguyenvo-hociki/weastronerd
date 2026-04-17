import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

// Small helper for the repeated arrow SVG used under signatures
const Arrow = ({ d, className }: { d: string; className?: string }) => (
  <svg className={className} viewBox="0 0 160 90" aria-hidden="true">
    <path d={d} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M140 35 L 126 28 M140 35 L 128 45" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

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
  
useEffect(() => { //Scroll handler with rAF optimization
  let frame: number | null = null;

  const onScroll = () => {
    if (frame === null) {
      frame = requestAnimationFrame(() => {
        frame = null;
        const sectionTop = sectionRef.current?.offsetTop ?? 0;
        const p = clamp((window.scrollY - sectionTop) / SHRINK_DISTANCE, 0, 1);
        setProgress(prev => (Math.abs(prev - p) > 1e-3 ? p : prev));
      });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    if (frame !== null) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
  };
}, []);

  // Banner scaling:
  const scale = 1 - progress * 0.5;
  
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
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={sectionRef}>
      <div style={{ position: progress < 1 ? "sticky" : "relative",
                    top: progress < 1 ? 72 : undefined,
                    zIndex: 5,
                  }}>
        <div className="poster" style={posterStyle}>
          <div className="poster-lines" />

          <div className="poster-content">
            <div className="poster-aboutus">Click to know about each of us:</div>

            <div className="arrow-wrap">
              {/* poster-tile is div with semantic button actions, no css config needed */}
              <div role="button"
                  className="poster-title"
                  onClick={collapseNow}
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      collapseNow();
                    }
                  }}>
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
                  <Arrow className="arrow-svg arrow-sig arrow-eddie" d={"M10 70 C 45 78, 95 18, 140 35"} />
                </div>
              </div>

              <div className="pill-block">
                <div className="poster-pill">Brisbane, Australia</div>
                <div className="arrow-wrap">
                  <Link className="signature" to="/artists">Julun</Link>
                  <Arrow className="arrow-svg arrow-sig arrow-julun" d={"M10 70 C 75 98, 95 18, 140 35"} />
                </div>
              </div>

              <div className="pill-block">
                <div className="poster-pill">Texas, USA</div>
                <div className="arrow-wrap">
                  <Link className="signature" to="/artists">Kin6</Link>
                  <Arrow className="arrow-svg arrow-sig arrow-kin6" d={"M10 70 C 95 100, 95 38, 140 35"} />
                </div>
              </div>
              
              <div className="pill-block">
                <div className="poster-pill">Vancouver, Canada</div>
                <div className="arrow-wrap">
                  <Link className="signature" to="/artists">Kkkuiii</Link>
                  <Arrow className="arrow-svg arrow-sig arrow-kkk" d={"M10 70 C 95 108, 75 38, 140 35"} />
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
          "We met at Phan Boi Chau High School in Cam Ranh City, Khanh Hoa, Vietnam."<br />
          <br />
          "Formed in 2021, the band consists of Vo Nguyen Minh Hieu (Kin6), Pham Khanh Truong (Eddie P), Nguyen Hoai Vu Luan (Julun), and Nguyen Quoc Dung (Dung)."<br />
          <br />
          "We are not made to fit into a box.<br />
          Each member brings a distinct color, meeting at a shared point through music and difference in music,
          because the unusual always carries depth and can never be copied."<br />
          <br />
          "There are dark phases and beautiful ones, chaos and peace, and loves broken beyond repair.<br />
          All of it goes into the music, carried through each album we release."
        </p>
        <p>
          We Astronerd! Step in, listen close, and stay awhile!
          <br />
          <br />
          <br />
          <br />
        </p>
      </div>

    </div>
  );
}