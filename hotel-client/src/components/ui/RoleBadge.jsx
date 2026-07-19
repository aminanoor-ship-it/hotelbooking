const styles = {
  Admin: 'bg-forest text-cream',
  User: 'bg-mint text-forest',
}

export default function RoleBadge({ role }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[role] || 'bg-ink/10 text-ink/60'}`}>
      {role || '—'}
    </span>
  )
}
