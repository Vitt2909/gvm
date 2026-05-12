import useReveal from "../hooks/useReveal.js";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", style, ...props }) {
  const { ref, revealClass, revealStyle } = useReveal(delay);
  const combinedClass = [revealClass, className].filter(Boolean).join(" ");
  const combinedStyle = revealStyle || style ? { ...revealStyle, ...style } : undefined;

  return (
    <Tag ref={ref} className={combinedClass} style={combinedStyle} {...props}>
      {children}
    </Tag>
  );
}
