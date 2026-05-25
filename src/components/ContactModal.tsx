import { X } from 'lucide-react'
import { ContactForm } from './ContactForm'
import type { Contact, ContactFormValues } from '../types/contact'

type ContactModalProps = {
  contact: Contact | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: ContactFormValues, id?: string) => void
}

export function ContactModal({ contact, isOpen, onClose, onSubmit }: ContactModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button className="modal-close icon-button" type="button" aria-label="Close contact form" onClick={onClose}>
          <X size={18} />
        </button>
        <ContactForm editingContact={contact} titleId="contact-modal-title" onCancelEdit={onClose} onSubmit={onSubmit} />
      </section>
    </div>
  )
}
