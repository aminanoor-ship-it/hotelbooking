import { useState } from 'react'
import Button from '../ui/Button'

export default function UserForm({ initialValues, mode = 'edit', onSubmit, onCancel }) {
  const isCreate = mode === 'create'
  const [fullName, setFullName] = useState(initialValues?.fullName || '')
  const [email, setEmail] = useState(initialValues?.email || '')
  const [phoneNumber, setPhoneNumber] = useState(initialValues?.phoneNumber || '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(initialValues?.role || 'User')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  function validate() {
    const next = {}
    if (!fullName.trim()) next.fullName = 'Full name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address'
    if (phoneNumber && !/^061\d{7}$/.test(phoneNumber))
      next.phoneNumber = 'Phone must start with 061 and be 10 digits'
    if (isCreate && password.length < 6) next.password = 'Password must be at least 6 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber || null,
      }
      if (isCreate) {
        payload.password = password
        payload.role = role
      }
      await onSubmit(payload)
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'rounded-xl border border-ink/10 px-4 py-2.5 text-sm focus:border-forest focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink">Full name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
        {errors.fullName && <span className="text-xs text-red-600">{errors.fullName}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink">Phone number</label>
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="061XXXXXXX" className={inputClass} />
        {errors.phoneNumber && <span className="text-xs text-red-600">{errors.phoneNumber}</span>}
      </div>

      {isCreate && (
        <>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
            {errors.password && <span className="text-xs text-red-600">{errors.password}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </>
      )}

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : isCreate ? 'Create user' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}
