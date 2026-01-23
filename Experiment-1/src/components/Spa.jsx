import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

export default function SinglePageApp() {
  return (
    <BrowserRouter>
      <nav style={navStyles.nav}>
        <Link style={navStyles.link} to="/">Home</Link>
        <Link style={navStyles.link} to="/about">About</Link>
        <Link style={navStyles.link} to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

const navStyles = {
  nav: {
    padding: "1rem 2rem",
    background: "linear-gradient(90deg, #16a34a, #22c55e)",
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "1.05rem",
    fontWeight: "600",
    padding: "8px 16px",
    borderRadius: "999px",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
};
