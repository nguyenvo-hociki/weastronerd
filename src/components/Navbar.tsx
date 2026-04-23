import { Link } from "react-router-dom";
import logo from "../assets/astronerd.png";

export default function Navbar() {
  return (
    <header className="navbar">
      {/* LEFT */}
      <nav className="nav-left">
        <a className="nav-link" href="/artists">
          Artists
        </a>
        <Link className="nav-link" to="/albums">
          Albums
        </Link>
        <Link className="nav-link" to="/news">
          News
        </Link>
      </nav>

      {/* CENTER (logo) */}
      <div className="nav-center">
        <a href="/" aria-label="Go to home">
          <img className="nav-logo" src={logo} alt="Logo" />
        </a>
      </div>

      {/* RIGHT (search) */}
      <div className="nav-right">
        <input className="nav-search" placeholder="Search..." aria-label="Search"/>
      </div>
    </header>
  );
}