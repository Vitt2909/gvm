import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, onNavigate }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <img src={project.image} alt={`Preview do projeto ${project.title}`} />
      </div>
      <div className="project-body">
        <div>
          <span>{project.type}</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <small key={tag}>{tag}</small>
          ))}
        </div>
        <button type="button" onClick={() => onNavigate("/contato")}>
          Conversar sobre projeto <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
