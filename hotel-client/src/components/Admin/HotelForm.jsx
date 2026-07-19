import { useState } from 'react'
import Button from '../ui/Button'
import TextField from '../ui/TextField'
import ImageUpload from './ImageUpload'

const emptyForm = { name: '', location: '', description: '', imageUrl: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Hotel name is required.'
  if (!form.location.trim()) errors.location = 'Location is required.'
  return errors
}

export default function HotelForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...emptyForm, ...initialValues })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const initialImage = initialValues?.imageUrl || ''

  function handleChange(event) {
    const { name, value } = event.target
    setForm((f) => ({ ...f, [name]: value }))
    setFieldErrors((f) => ({ ...f, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const errors = validate(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} error={fieldErrors.name} />
      <TextField
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
        error={fieldErrors.location}
      />
      <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
      <ImageUpload
        value={form.imageUrl}
        initialValue={initialImage}
        onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
