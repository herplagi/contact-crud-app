import type { Contact, RandomUser, RandomUserResponse } from '../types/contact'

const RANDOM_USER_URL = 'https://randomuser.me/api/?results=30'

export const mapRandomUserToContact = (user: RandomUser): Contact => ({
  id: user.login.uuid,
  firstName: user.name.first,
  lastName: user.name.last,
  email: user.email,
  phone: user.phone,
  city: user.location.city,
  country: user.location.country,
  picture: user.picture.large,
})

export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await fetch(RANDOM_USER_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch contacts')
  }

  const data = (await response.json()) as RandomUserResponse
  return data.results.map(mapRandomUserToContact)
}
