export default function Card({
  children,
  className = '',
  hover = true,
}) {
  const hoverClass = hover ? 'hover:shadow-lg hover:scale-105' : ''

  return (
    <div
      className={`
        bg-white
        rounded-lg
        shadow-md
        p-6
        transition-all
        duration-300
        ${hoverClass}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  )
}
