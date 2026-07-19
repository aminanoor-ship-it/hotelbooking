import { useState } from 'react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Spinner from '../../components/ui/Spinner'
import ErrorState from '../../components/ui/ErrorState'
import HotelForm from '../../components/Admin/HotelForm'
import IconAction from '../../components/Admin/IconAction'
import { EditIcon, DeleteIcon } from '../../components/Admin/AdminIcons'
import { useHotels } from '../../hooks/useHotels'
import api from '../../api/client'

export default function ManageHotels() {
  const { hotels, loading, error, refresh } = useHotels()
  const [modalState, setModalState] = useState(null) // null | 'add' | hotel object
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  async function handleSave(form) {
    if (modalState === 'add') {
      await api.post('/hotels', form)
    } else {
      await api.put(`/hotels/${modalState.id}`, form)
    }
    setModalState(null)
    refresh()
  }

  async function handleDelete() {
    if (!deleteTarget) return

    setDeleteError('')
    setDeleting(true)
    try {
      await api.delete(`/hotels/${deleteTarget.id}`)
      setDeleteTarget(null)
      refresh()
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Could not delete this hotel.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-ink">Manage Hotels</h2>
        <Button variant="primary" onClick={() => setModalState('add')}>
          Add Hotel
        </Button>
      </div>

      {loading && <Spinner label="Loading hotels…" />}
      {!loading && error && <ErrorState onRetry={refresh} />}
      {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm shadow-ink/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Rooms</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-ink">{hotel.name}</td>
                  <td className="px-6 py-4 text-ink/60">{hotel.location}</td>
                  <td className="px-6 py-4 text-ink/60">{hotel.rooms?.length || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <IconAction label="Edit" tone="brand" onClick={() => setModalState(hotel)}>
                        <EditIcon />
                      </IconAction>
                      <IconAction
                        label="Delete"
                        tone="danger"
                        onClick={() => {
                          setDeleteError('')
                          setDeleteTarget(hotel)
                        }}
                      >
                        <DeleteIcon />
                      </IconAction>
                    </div>
                  </td>
                </tr>
              ))}
              {hotels.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-ink/50">
                    No hotels yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalState !== null}
        onClose={() => setModalState(null)}
        title={modalState === 'add' ? 'Add Hotel' : 'Edit Hotel'}
      >
        <HotelForm
          initialValues={modalState && modalState !== 'add' ? modalState : undefined}
          onSubmit={handleSave}
          onCancel={() => setModalState(null)}
        />
      </Modal>

      <Modal
        open={deleteTarget !== null}
        onClose={() => !deleting && setDeleteTarget(null)}
        title="Delete hotel"
      >
        {deleteTarget && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-ink/65">
              Delete <span className="font-semibold text-ink">{deleteTarget.name}</span>? This action cannot be undone.
            </p>
            {deleteError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{deleteError}</p>}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
