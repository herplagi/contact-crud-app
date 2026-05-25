import { describe, expect, it } from 'vitest'
import contactsReducer, {
  addContact,
  deleteContact,
  loadContacts,
  setQuery,
  updateContact,
  type ContactsState,
} from './contactsSlice'
import type { Contact } from '../../types/contact'

const contact: Contact = {
  id: 'contact-1',
  firstName: 'Alya',
  lastName: 'Pratama',
  email: 'alya@example.com',
  phone: '08123456789',
  city: 'Jakarta',
  country: 'Indonesia',
  picture: 'https://example.com/alya.jpg',
}

const stateWithContact: ContactsState = {
  items: [contact],
  status: 'idle',
  error: null,
  query: '',
}

describe('contactsSlice', () => {
  it('adds a new contact', () => {
    const state = contactsReducer(
      undefined,
      addContact({
        firstName: 'Bima',
        lastName: 'Saputra',
        email: 'bima@example.com',
        phone: '0899999999',
        city: 'Surabaya',
        country: 'Indonesia',
      }),
    )

    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toMatchObject({
      firstName: 'Bima',
      lastName: 'Saputra',
      email: 'bima@example.com',
    })
  })

  it('updates an existing contact', () => {
    const state = contactsReducer(
      stateWithContact,
      updateContact({
        ...contact,
        phone: '0800000000',
      }),
    )

    expect(state.items[0].phone).toBe('0800000000')
  })

  it('deletes a contact by id', () => {
    const state = contactsReducer(stateWithContact, deleteContact('contact-1'))

    expect(state.items).toHaveLength(0)
  })

  it('stores search query', () => {
    const state = contactsReducer(undefined, setQuery('jakarta'))

    expect(state.query).toBe('jakarta')
  })

  it('stores loaded contacts from async action', () => {
    const state = contactsReducer(undefined, loadContacts.fulfilled([contact], '', undefined))

    expect(state.status).toBe('succeeded')
    expect(state.items).toEqual([contact])
  })
})
