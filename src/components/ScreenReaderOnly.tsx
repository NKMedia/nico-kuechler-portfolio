/**
 * ScreenReaderOnly component for content that should only be visible to screen readers
 *
 * This component hides content visually but keeps it accessible to assistive technologies.
 * Useful for providing additional context or instructions that screen reader users need
 * but would be redundant for sighted users.
 *
 * @param children - Content to be hidden visually but accessible to screen readers
 * @returns JSX element with sr-only styling
 */

interface ScreenReaderOnlyProps {
  readonly children: React.ReactNode;
}

function ScreenReaderOnly({
  children,
}: ScreenReaderOnlyProps): React.ReactElement {
  return <span className="sr-only">{children}</span>;
}

export default ScreenReaderOnly;
