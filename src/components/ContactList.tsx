import { ContactCard } from './ContactCard'
import type { Contact } from '../types/contact'

type ContactListProps = {
  contacts: Contact[]
  groupBy: 'none' | 'country' | 'city'
  viewMode: 'grid' | 'list'
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
}

const groupContacts = (contacts: Contact[], groupBy: 'country' | 'city') => {
  return contacts.reduce<Record<string, Contact[]>>((groups, contact) => {
    const key = groupBy === 'country' ? contact.country : contact.city
    groups[key] = [...(groups[key] ?? []), contact]
    return groups
  }, {})
}

export function ContactList({ contacts, groupBy, viewMode, onDelete, onEdit }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No contacts found</h3>
        <p>Try another keyword or add a new contact from the form.</p>
      </div>
    )
  }

  if (groupBy !== 'none') {
    const groupedContacts = groupContacts(contacts, groupBy)
    const groupNames = Object.keys(groupedContacts).sort((first, second) => first.localeCompare(second))

    return (
      <div className="grouped-contact-list">
        {groupNames.map((groupName) => (
          <section className="contact-group" key={groupName}>
            <div className="group-heading">
              <h3>{groupName}</h3>
              <span>{groupedContacts[groupName].length} contacts</span>
            </div>
            <div className={`contact-list contact-list--${viewMode}`}>
              {groupedContacts[groupName].map((contact) => (
                <ContactCard key={contact.id} contact={contact} onDelete={onDelete} onEdit={onEdit} />
              ))}
            </div>
          </section>
        ))}
      </div>
    )
  }

  return (
    <div className={`contact-list contact-list--${viewMode}`}>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}
