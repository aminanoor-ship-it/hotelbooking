import { Link } from 'react-router-dom'

export default function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold text-cream">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className="text-sm text-cream/55 transition-colors hover:text-cream">
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className="text-sm text-cream/55 transition-colors hover:text-cream">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
