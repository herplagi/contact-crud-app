import { useEffect, useMemo, useState } from 'react'
import { ContactForm } from './components/ContactForm'
import { ContactList } from './components/ContactList'
import { SearchBar } from './components/SearchBar'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  selectContacts,
  selectContactsError,
  selectContactsQuery,
  selectContactsStatus,
  selectFilteredContacts,
} from './features/contacts/contactsSelectors'
import { addContact, deleteContact, loadContacts, setQuery, updateContact } from './features/contacts/contactsSlice'
import type { Contact, ContactFormValues } from './types/contact'

function App() {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector(selectContacts)
  const filteredContacts = useAppSelector(selectFilteredContacts)
  const status = useAppSelector(selectContactsStatus)
  const error = useAppSelector(selectContactsError)
  const query = useAppSelector(selectContactsQuery)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(loadContacts())
    }
  }, [dispatch, status])

  const stats = useMemo(() => {
    const countries = new Set(contacts.map((contact) => contact.country))

    return {
      total: contacts.length,
      countries: countries.size,
      filtered: filteredContacts.length,
    }
  }, [contacts, filteredContacts])

  const handleSubmit = (values: ContactFormValues, id?: string) => {
    if (id && editingContact) {
      dispatch(updateContact({ ...editingContact, ...values, picture: values.picture || editingContact.picture }))
      setEditingContact(null)
      return
    }

    dispatch(addContact(values))
  }

  const handleRefresh = () => {
    setEditingContact(null)
    void dispatch(loadContacts())
  }

  return (
    <main className="app-shell">
      <section className="hero-section">
        <div>
          <p className="eyebrow">Frontend coding test</p>
          <h1>Contact Manager</h1>
          <p className="hero-copy">
            CRUD contact app built with React, TypeScript, Redux Toolkit, and Random User API.
          </p>
        </div>

        <div className="stats-grid" aria-label="Contact statistics">
          <div>
            <span>{stats.total}</span>
            <p>Total contacts</p>
          </div>
          <div>
            <span>{stats.countries}</span>
            <p>Countries</p>
          </div>
          <div>
            <span>{stats.filtered}</span>
            <p>Shown</p>
          </div>
        </div>
      </section>

      <section className="content-layout">
        <aside className="side-panel">
          <ContactForm editingContact={editingContact} onCancelEdit={() => setEditingContact(null)} onSubmit={handleSubmit} />
        </aside>

        <section className="contacts-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Directory</p>
              <h2>Contacts</h2>
            </div>
          </div>

          <SearchBar query={query} status={status} onRefresh={handleRefresh} onSearch={(value) => dispatch(setQuery(value))} />

          {error && <p className="error-banner">{error}</p>}
          {status === 'loading' && contacts.length === 0 ? (
            <div className="loading-state">Loading contacts...</div>
          ) : (
            <ContactList contacts={filteredContacts} onDelete={(id) => dispatch(deleteContact(id))} onEdit={setEditingContact} />
          )}
        </section>
      </section>
    </main>
  )
}

export default App
