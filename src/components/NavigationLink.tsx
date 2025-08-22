import { Link } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  isActive: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * NavigationLink component with accessibility features
 */
function NavigationLink({
  to,
  isActive,
  onClick,
  children,
}: NavigationLinkProps): React.ReactElement {
  return (
    <Link
      to={to}
      className={isActive ? "active" : ""}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default NavigationLink;
