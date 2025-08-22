/**
 * SkipLinks component for improved keyboard navigation accessibility
 *
 * Features:
 * - Skip to main content
 * - Skip to navigation
 * - Only visible when focused
 * - Proper ARIA labels
 */
function SkipLinks(): React.ReactElement {
  const skipToMain = (): void => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  const skipToNav = (): void => {
    const navigation = document.getElementById("main-navigation");
    if (navigation) {
      navigation.focus();
      navigation.scrollIntoView();
    }
  };

  return (
    <div className="skip-links">
      <button
        className="skip-link"
        onClick={skipToMain}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            skipToMain();
          }
        }}
      >
        Skip to main content
      </button>
      <button
        className="skip-link"
        onClick={skipToNav}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            skipToNav();
          }
        }}
      >
        Skip to navigation
      </button>
    </div>
  );
}

export default SkipLinks;
