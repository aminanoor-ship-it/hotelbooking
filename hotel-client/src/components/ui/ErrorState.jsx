import Button from './Button'

export default function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this right now. Please try again.",
  onRetry,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center gap-3 rounded-3xl bg-white px-6 py-14 text-center shadow-sm shadow-ink/5 ${className}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl">⚠️</span>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-ink/55">{description}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
