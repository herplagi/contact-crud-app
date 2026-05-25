import { Edit3, Mail, MapPin, Phone, Trash2 } from 'lucide-react'
import type { Contact } from '../types/contact'

type ContactCardProps = {
  contact: Contact
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
}

export function ContactCard({ contact, onDelete, onEdit }: ContactCardProps) {
  const fullName = `${contact.firstName} ${contact.lastName}`

  return (
    <article className="contact-card">
      <img className="contact-avatar" src={contact.picture} alt={fullName} />

      <div className="contact-card__content">
        <div>
          <h3>{fullName}</h3>
          <p className="contact-location">
            <MapPin size={15} />
            {contact.city}, {contact.country}
          </p>
        </div>

        <div className="contact-meta">
          <span>
            <Mail size={15} />
            {contact.email}
          </span>
          <span>
            <Phone size={15} />
            {contact.phone}
          </span>
        </div>
      </div>

      <div className="card-actions">
        <button className="icon-button" type="button" title="Edit" aria-label={`Edit ${fullName}`} onClick={() => onEdit(contact)}>
          <Edit3 size={18} />
        </button>
        <button
          className="icon-button danger"
          type="button"
          title="Delete"
          aria-label={`Delete ${fullName}`}
          onClick={() => onDelete(contact.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  )
}
