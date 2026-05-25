import { ContactCard } from './ContactCard'
import type { Contact } from '../types/contact'

type ContactListProps = {
  contacts: Contact[]
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
}

export function ContactList({ contacts, onDelete, onEdit }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No contacts found</h3>
        <p>Try another keyword or add a new contact from the form.</p>
      </div>
    )
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}
