import useReveal from "../hooks/useReveal.js";

export default function SectionHeader({ label, title, text, centered = false, invert = false }) {
  const { ref, revealClass } = useReveal();
  return (
    <div
      ref={ref}
      className={`section-header ${centered ? "is-centered" : ""} ${invert ? "is-invert" : ""} ${revealClass}`.trim()}
    >
      {label ? <span className="section-label">{label}</span> : null}
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {text ? <p>{text}</p> : null}
    </div>
  );
}
