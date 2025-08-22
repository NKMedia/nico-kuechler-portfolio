import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

// Lazy loading for better performance
const About = lazy(() => import("./components/About"));
const Lebenslauf = lazy(() => import("./components/Lebenslauf"));
const Projekte = lazy(() => import("./components/Projekte"));
const Kontakt = lazy(() => import("./components/Kontakt"));

// Loading component
const Loading = () => (
  <div className="content">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        fontSize: "1.2rem",
        color: "#2563eb",
      }}
    >
      Lädt...
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="main-bg fade-in">
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/lebenslauf" element={<Lebenslauf />} />
            <Route path="/projekte" element={<Projekte />} />
            <Route path="/kontakt" element={<Kontakt />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
