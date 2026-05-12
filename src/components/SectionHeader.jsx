export default function SectionHeader({ label, title, text, centered = false, invert = false }) {
  return (
    <div className={`section-header ${centered ? "is-centered" : ""} ${invert ? "is-invert" : ""}`.trim()}>
      {label ? <span className="section-label">{label}</span> : null}
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {text ? <p>{text}</p> : null}
    </div>
  );
}
