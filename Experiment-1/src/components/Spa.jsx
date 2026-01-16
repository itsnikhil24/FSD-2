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
    padding: "1rem",
    backgroundColor: "#111827",
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
};
