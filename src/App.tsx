import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipLinks from "./components/SkipLinks";
import "./App.css";

// Lazy loading for better performance
const About = lazy(() => import("./components/About"));
const Lebenslauf = lazy(() => import("./components/Lebenslauf"));
const Projekte = lazy(() => import("./components/Projekte"));
const Kontakt = lazy(() => import("./components/Kontakt"));
const Impressum = lazy(() => import("./components/Impressum"));
const Datenschutz = lazy(() => import("./components/Datenschutz"));
const NotFound = lazy(() => import("./components/NotFound"));

/**
 * Loading component displayed while lazy-loaded components are being fetched
 * @returns {JSX.Element} Loading indicator component
 */
const Loading: React.FC = () => (
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

/**
 * Main App component that handles routing and layout structure
 *
 * Features:
 * - React Router for SPA navigation
 * - Lazy loading of route components for performance
 * - Consistent layout with Header and Footer
 * - Loading fallback for better UX
 *
 * @returns {JSX.Element} The main application component
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <SkipLinks />
        <div className="main-bg fade-in">
          <Header />
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/lebenslauf" element={<Lebenslauf />} />
                <Route path="/projekte" element={<Projekte />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
