import ProfileCard from "./ProfileCard";
import { PROJECTS } from "../constants/projects";

/**
 * Projekte component - Portfolio page displaying selected projects and work
 *
 * Features:
 * - Project cards rendered from PROJECTS data (src/constants/projects.ts)
 * - External proof links (Steam, itch.io, neverknights.de) per project
 * - Technology stacks and timeframes
 * - Responsive grid layout
 *
 * @returns Portfolio projects page component
 */
function Projekte(): React.ReactElement {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Projekte</h1>
        <h3>Ausgewählte Arbeiten & Entwicklungen</h3>

        <div className="project-grid">
          {PROJECTS.map((project) => (
            <div className="project-card" key={project.id}>
              <h4>{project.title}</h4>
              {project.meta.map((m) => (
                <p key={m.label}>
                  <strong>{m.label}:</strong> {m.value}
                </p>
              ))}
              <p>{project.description}</p>
              {project.links && (
                <p className="project-links">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <i className={link.icon} aria-hidden="true" />{" "}
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projekte;
