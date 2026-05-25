import { createAsyncThunk, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import { fetchContacts } from '../../services/randomUserApi'
import type { Contact, ContactFormValues } from '../../types/contact'

type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ContactsState = {
  items: Contact[]
  status: LoadingStatus
  error: string | null
  query: string
}

const initialState: ContactsState = {
  items: [],
  status: 'idle',
  error: null,
  query: '',
}

export const loadContacts = createAsyncThunk('contacts/loadContacts', fetchContacts)

const createContact = (values: ContactFormValues): Contact => ({
  ...values,
  id: nanoid(),
  picture:
    values.picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      `${values.firstName} ${values.lastName}`,
    )}&background=2563eb&color=fff`,
})

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, action: PayloadAction<Contact>) => {
        state.items.unshift(action.payload)
      },
      prepare: (values: ContactFormValues) => ({
        payload: createContact(values),
      }),
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.items.findIndex((contact) => contact.id === action.payload.id)

      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((contact) => contact.id !== action.payload)
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContacts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadContacts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadContacts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load contacts'
      })
  },
})

export const { addContact, deleteContact, setQuery, updateContact } = contactsSlice.actions
export default contactsSlice.reducer
