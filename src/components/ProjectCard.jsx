import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import useReveal from "../hooks/useReveal.js";

export default function ProjectCard({ project, onNavigate, delay = 0 }) {
  const { ref, revealClass, revealStyle } = useReveal(delay);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article ref={ref} data-type={project.type} className={`project-card ${revealClass}`} style={revealStyle}>
      <div className={`project-image ${imgLoaded ? "img-loaded" : ""}`}>
        <img
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
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
          <span>Conversar sobre projeto</span> <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}
