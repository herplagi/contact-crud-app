import type { RootState } from '../../app/store'

export const selectContacts = (state: RootState) => state.contacts.items
export const selectContactsStatus = (state: RootState) => state.contacts.status
export const selectContactsError = (state: RootState) => state.contacts.error
export const selectContactsQuery = (state: RootState) => state.contacts.query

export const selectFilteredContacts = (state: RootState) => {
  const query = state.contacts.query.trim().toLowerCase()

  if (!query) {
    return state.contacts.items
  }

  return state.contacts.items.filter((contact) => {
    const searchable = [
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phone,
      contact.city,
      contact.country,
    ]
      .join(' ')
      .toLowerCase()

    return searchable.includes(query)
  })
}
