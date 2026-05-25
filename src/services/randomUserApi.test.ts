import { describe, expect, it } from 'vitest'
import { mapRandomUserToContact } from './randomUserApi'
import type { RandomUser } from '../types/contact'

describe('mapRandomUserToContact', () => {
  it('maps Random User API response into contact entity', () => {
    const randomUser: RandomUser = {
      login: { uuid: 'user-1' },
      name: { first: 'Jane', last: 'Doe' },
      email: 'jane@example.com',
      phone: '08123456789',
      location: { city: 'Bandung', country: 'Indonesia' },
      picture: { large: 'https://example.com/jane.jpg' },
    }

    expect(mapRandomUserToContact(randomUser)).toEqual({
      id: 'user-1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '08123456789',
      city: 'Bandung',
      country: 'Indonesia',
      picture: 'https://example.com/jane.jpg',
    })
  })
})
