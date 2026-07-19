export default function IconButton({ children, variant = 'dark', className = '', ...props }) {
  const variants = {
    dark: 'bg-ink text-cream hover:bg-forest',
    light: 'bg-mint text-ink hover:bg-mint-dark',
    outline: 'border border-ink/15 text-ink hover:border-ink/40',
  }

  return (
    <button
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
