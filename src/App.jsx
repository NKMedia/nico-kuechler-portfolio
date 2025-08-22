import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Lebenslauf from "./components/Lebenslauf";
import Projekte from "./components/Projekte";
import Kontakt from "./components/Kontakt";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main-bg">
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/lebenslauf" element={<Lebenslauf />} />
          <Route path="/projekte" element={<Projekte />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
