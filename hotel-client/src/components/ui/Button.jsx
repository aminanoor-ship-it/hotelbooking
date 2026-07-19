const variants = {
  primary: 'bg-ink text-cream hover:bg-forest',
  secondary: 'bg-transparent text-ink border border-ink/15 hover:border-ink/40',
  light: 'bg-cream text-ink hover:bg-white',
}

export default function Button({
  as,
  href,
  children,
  variant = 'primary',
  icon = null,
  className = '',
  ...props
}) {
  const Tag = as || (href ? 'a' : 'button')
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200'

  return (
    <Tag href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon}
    </Tag>
  )
}
