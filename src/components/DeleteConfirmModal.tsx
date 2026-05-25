import { AlertTriangle, Trash2, X } from 'lucide-react'
import type { Contact } from '../types/contact'

type DeleteConfirmModalProps = {
  contact: Contact | null
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({ contact, onCancel, onConfirm }: DeleteConfirmModalProps) {
  if (!contact) {
    return null
  }

  const fullName = `${contact.firstName} ${contact.lastName}`

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
        <button className="modal-close icon-button" type="button" aria-label="Close delete confirmation" onClick={onCancel}>
          <X size={18} />
        </button>

        <div className="confirm-icon">
          <AlertTriangle size={24} />
        </div>

        <div className="confirm-content">
          <p className="eyebrow">Delete contact</p>
          <h2 id="delete-modal-title">Remove {fullName}?</h2>
          <p>
            This contact will be removed from the current directory. You can refresh from the API again, but local
            changes will not be restored.
          </p>
        </div>

        <div className="confirm-actions">
          <button className="text-button" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="danger-button" type="button" onClick={onConfirm}>
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </section>
    </div>
  )
}
