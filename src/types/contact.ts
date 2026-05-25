export type Contact = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  country: string
  picture: string
}

export type ContactFormValues = Omit<Contact, 'id' | 'picture'> & {
  picture?: string
}

export type RandomUserResponse = {
  results: RandomUser[]
}

export type RandomUser = {
  login: {
    uuid: string
  }
  name: {
    first: string
    last: string
  }
  email: string
  phone: string
  location: {
    city: string
    country: string
  }
  picture: {
    large: string
  }
}
