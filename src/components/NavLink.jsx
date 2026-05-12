export default function NavLink({ to, currentPath, onNavigate, children, className = "" }) {
  const isActive = currentPath === to;

  const handleClick = (event) => {
    event.preventDefault();
    onNavigate(to);
  };

  return (
    <a
      href={to}
      className={`${className} ${isActive ? "is-active" : ""}`.trim()}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
}
