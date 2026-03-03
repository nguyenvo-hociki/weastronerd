import { Link, Route, Routes } from "react-router-dom";
import logo from "./assets/ADIDAS.png";
import v1 from "./assets/mosaic/1.mp4";
import v2 from "./assets/mosaic/2.mp4";
import v3 from "./assets/mosaic/3.mp4";
import v4 from "./assets/mosaic/4.mp4";
import v5 from "./assets/mosaic/5.mp4";
import v6 from "./assets/mosaic/6.mp4";
import v7 from "./assets/mosaic/7.mp4";
import v8 from "./assets/mosaic/8.mp4";
import v9 from "./assets/mosaic/9.mp4";

function Home() {
  const videos = [v1, v2, v3, v4, v5, v6, v7, v8, v9];

  return (
    <main className="home">
      {/* Section 1: 3x3 mosaic */}
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

      {/* Section 2: black page with words in the middle */}
      <section className="section black-page">
        <div className="black-text">COMING SOON</div>
        <div className="social-rail">
          <a className="social-icon" href="https://www.youtube.com/@we.astronerd/videos" target="_blank" rel="noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" className="icon-svg" aria-hidden="true">
              <path d="M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32.7 32.7 0 0 0 0 12s0 3.4.5 5.8a3.1 3.1 0 0 0 2.2 2.2c1.9.5 9.3.5 9.3.5s7.4 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2c.5-2.4.5-5.8.5-5.8s0-3.4-.5-5.8ZM9.7 15.5V8.5L16 12l-6.3 3.5Z" />
          </svg>
          </a>

          <a className="social-icon" href="https://www.instagram.com/we.astronerd" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="icon-svg" aria-hidden="true">
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.2 1.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
            </svg>
          </a>

          <a className="social-icon" href="https://www.facebook.com/we.astronerd" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" className="icon-svg" aria-hidden="true">
              <path d="M13.5 22v-8h2.7l.5-3h-3.2V9.2c0-.9.3-1.6 1.7-1.6h1.7V5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8V11H7v3h2.7v8h3.8Z" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      {/* LEFT */}
      <nav className="nav-left">
        <Link className="nav-link" to="/artists">
          Artists
        </Link>
        <Link className="nav-link" to="/albums">
          Albums
        </Link>
        <Link className="nav-link" to="/news">
          News
        </Link>
      </nav>

      {/* CENTER (logo) */}
      <div className="nav-center">
        <Link to="/" aria-label="Go to home">
          <img className="nav-logo" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* RIGHT (search) */}
      <div className="nav-right">
        <input className="nav-search" placeholder="Search..." />
      </div>
    </header>
  );
}

function Artists() {
  return (
    <main className="page">
      <h1>Artists</h1>
      <p>Artists page.</p>
    </main>
  );
}

function Albums() {
  return (
    <main className="page">
      <h1>Albums</h1>
      <p>Albums page.</p>
    </main>
  );
}

function News() {
  return (
    <main className="page">
      <h1>News</h1>
      <p>News page.</p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}