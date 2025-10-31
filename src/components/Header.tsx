import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFocusTrap } from "../hooks";
import ThemeToggle from "./ThemeToggle";
import NavigationLink from "./NavigationLink";
import PWAInstallButton from "./PWAInstallButton";

/**
 * Header component with navigation and mobile menu functionality
 *
 * Features:
 * - Responsive navigation with desktop and mobile layouts
 * - Active link highlighting based on current route
 * - Hamburger menu for mobile devices
 * - Integrated theme toggle button
 * - Accessibility support with aria-labels
 * - Keyboard navigation support
 *
 * @returns Header component with navigation
 */
function Header(): React.ReactElement {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const mobileNavRef = useFocusTrap<HTMLElement>();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Helper function to determine if a path is active
  const isActivePath = (path: string): boolean => location.pathname === path;

  return (
    <header className="header">
      <div className="header-left">
        <span className="dot" aria-hidden="true" />
        <span className="name">Nico Küchler</span>
        <span className="role">
          / SENIOR SOFTWARE DEVELOPER & MEDIA DESIGNER
        </span>
      </div>
      <div className="header-right">
        <nav
          className="header-nav"
          id="main-navigation"
          aria-label="Main navigation"
        >
          <NavigationLink to="/" isActive={isActivePath("/")}>
            ÜBER MICH
          </NavigationLink>
          <NavigationLink
            to="/lebenslauf"
            isActive={isActivePath("/lebenslauf")}
          >
            LEBENSLAUF
          </NavigationLink>
          <NavigationLink to="/projekte" isActive={isActivePath("/projekte")}>
            PROJEKTE
          </NavigationLink>
          <NavigationLink to="/kontakt" isActive={isActivePath("/kontakt")}>
            KONTAKT
          </NavigationLink>
        </nav>
        <PWAInstallButton className="header-pwa-install" />
        <ThemeToggle />
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${isMenuOpen ? "active" : ""}`}
        aria-label="Mobile navigation"
        ref={mobileNavRef}
      >
        <NavigationLink to="/" isActive={isActivePath("/")} onClick={closeMenu}>
          ÜBER MICH
        </NavigationLink>
        <NavigationLink
          to="/lebenslauf"
          isActive={isActivePath("/lebenslauf")}
          onClick={closeMenu}
        >
          LEBENSLAUF
        </NavigationLink>
        <NavigationLink
          to="/projekte"
          isActive={isActivePath("/projekte")}
          onClick={closeMenu}
        >
          PROJEKTE
        </NavigationLink>
        <NavigationLink
          to="/kontakt"
          isActive={isActivePath("/kontakt")}
          onClick={closeMenu}
        >
          KONTAKT
        </NavigationLink>
        <div className="mobile-nav-footer">
          <PWAInstallButton className="mobile-pwa-install" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
