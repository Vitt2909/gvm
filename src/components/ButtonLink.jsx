import { ArrowRight } from "lucide-react";

export default function ButtonLink({ to, onNavigate, children, variant = "primary", icon = true }) {
  return (
    <a
      href={to}
      className={`button button-${variant}`}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(to);
      }}
    >
      <span>{children}</span>
      {icon ? <ArrowRight size={18} /> : null}
    </a>
  );
}
