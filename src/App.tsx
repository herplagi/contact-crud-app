import { useEffect, useMemo, useState } from 'react'
import { Building2, Grid3X3, List, MapPin, Moon, Sun, UsersRound } from 'lucide-react'
import { AppSidebar, type DirectoryView } from './components/AppSidebar'
import { DeleteConfirmModal } from './components/DeleteConfirmModal'
import { ContactList } from './components/ContactList'
import { ContactModal } from './components/ContactModal'
import { Pagination } from './components/Pagination'
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

const PAGE_SIZE = 10

function App() {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector(selectContacts)
  const filteredContacts = useAppSelector(selectFilteredContacts)
  const status = useAppSelector(selectContactsStatus)
  const error = useAppSelector(selectContactsError)
  const query = useAppSelector(selectContactsQuery)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'night'>('light')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [directoryView, setDirectoryView] = useState<DirectoryView>('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(loadContacts())
    }
  }, [dispatch, status])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, directoryView, viewMode])

  const stats = useMemo(() => {
    const countries = new Set(contacts.map((contact) => contact.country))
    const cities = new Set(contacts.map((contact) => contact.city))

    return {
      total: contacts.length,
      countries: countries.size,
      cities: cities.size,
      filtered: filteredContacts.length,
    }
  }, [contacts, filteredContacts])

  const pagination = useMemo(() => {
    const totalItems = filteredContacts.length
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
    const safePage = Math.min(currentPage, totalPages)
    const startIndex = (safePage - 1) * PAGE_SIZE
    const endIndex = Math.min(startIndex + PAGE_SIZE, totalItems)

    return {
      contacts: filteredContacts.slice(startIndex, endIndex),
      currentPage: safePage,
      endItem: endIndex,
      startItem: totalItems === 0 ? 0 : startIndex + 1,
      totalItems,
      totalPages,
    }
  }, [currentPage, filteredContacts])

  const handleSubmit = (values: ContactFormValues, id?: string) => {
    if (id && editingContact) {
      dispatch(updateContact({ ...editingContact, ...values, picture: values.picture || editingContact.picture }))
      setEditingContact(null)
      setIsModalOpen(false)
      return
    }

    dispatch(addContact(values))
    setIsModalOpen(false)
  }

  const handleRefresh = () => {
    setEditingContact(null)
    setDeletingContact(null)
    setIsModalOpen(false)
    void dispatch(loadContacts())
  }

  const handleAddContact = () => {
    setEditingContact(null)
    setIsModalOpen(true)
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setEditingContact(null)
    setIsModalOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!deletingContact) {
      return
    }

    dispatch(deleteContact(deletingContact.id))
    setDeletingContact(null)
  }

  const directoryTitle = {
    all: 'All Contacts',
    countries: 'Contacts by Country',
    cities: 'Contacts by City',
  }[directoryView]

  const groupBy = {
    all: 'none',
    countries: 'country',
    cities: 'city',
  }[directoryView] as 'none' | 'country' | 'city'

  return (
    <main className="app-shell">
      <AppSidebar
        activeView={directoryView}
        cities={stats.cities}
        countries={stats.countries}
        query={query}
        status={status}
        total={stats.total}
        visible={stats.filtered}
        onAddContact={handleAddContact}
        onChangeView={setDirectoryView}
        onRefresh={handleRefresh}
        onSearch={(value) => dispatch(setQuery(value))}
      />

      <section className="main-workspace">
        <header className="workspace-header">
          <div>
            <h2>{directoryTitle}</h2>
            <p>
              {stats.filtered} of {stats.total} contacts
            </p>
          </div>
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'night' : 'light')}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            {theme === 'light' ? 'Night' : 'Light'}
          </button>
        </header>

        <section className="stat-cards" aria-label="Contact statistics">
          <article>
            <div>
              <strong>{stats.total}</strong>
              <span>Total</span>
            </div>
            <UsersRound size={20} />
          </article>
          <article>
            <div>
              <strong>{stats.countries}</strong>
              <span>Countries</span>
            </div>
            <Building2 size={20} />
          </article>
          <article>
            <div>
              <strong>{stats.cities}</strong>
              <span>Cities</span>
            </div>
            <MapPin size={20} />
          </article>
        </section>

        <section className="contacts-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Directory</p>
              <h2>{query ? `Search: ${query}` : directoryTitle}</h2>
            </div>
            <div className="panel-tools">
              <div className="segmented-control" aria-label="Contact view mode">
                <button
                  className={viewMode === 'grid' ? 'active' : ''}
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={17} />
                </button>
                <button
                  className={viewMode === 'list' ? 'active' : ''}
                  type="button"
                  aria-label="List view"
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
              <span className="count-pill">{stats.filtered} shown</span>
            </div>
          </div>

          {error && <p className="error-banner">{error}</p>}
          {status === 'loading' && contacts.length === 0 ? (
            <div className="loading-state">Loading contacts...</div>
          ) : (
            <>
              <ContactList
                contacts={pagination.contacts}
                groupBy={groupBy}
                viewMode={viewMode}
                onDelete={(id) => {
                  const target = contacts.find((contact) => contact.id === id)
                  setDeletingContact(target ?? null)
                }}
                onEdit={handleEditContact}
              />
              <Pagination
                currentPage={pagination.currentPage}
                endItem={pagination.endItem}
                pageSize={PAGE_SIZE}
                startItem={pagination.startItem}
                totalItems={pagination.totalItems}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </section>

      <ContactModal contact={editingContact} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
      <DeleteConfirmModal contact={deletingContact} onCancel={() => setDeletingContact(null)} onConfirm={handleConfirmDelete} />
    </main>
  )
}

export default App
