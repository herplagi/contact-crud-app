import { Save } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import type { Contact, ContactFormValues } from '../types/contact'

type ContactFormProps = {
  editingContact: Contact | null
  onCancelEdit: () => void
  onSubmit: (values: ContactFormValues, id?: string) => void
  titleId?: string
}

const emptyForm: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  picture: '',
}

export function ContactForm({ editingContact, onCancelEdit, onSubmit, titleId }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormValues>(emptyForm)

  useEffect(() => {
    if (editingContact) {
      setForm({
        firstName: editingContact.firstName,
        lastName: editingContact.lastName,
        email: editingContact.email,
        phone: editingContact.phone,
        city: editingContact.city,
        country: editingContact.country,
        picture: editingContact.picture,
      })
      return
    }

    setForm(emptyForm)
  }, [editingContact])

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(form, editingContact?.id)
    setForm(emptyForm)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="modal-heading">
        <div>
          <p className="eyebrow">{editingContact ? 'Edit contact' : 'New contact'}</p>
          <h2 id={titleId}>{editingContact ? 'Update contact' : 'Create contact'}</h2>
        </div>
      </div>

      <div className="form-grid">
        <label>
          First name
          <input
            required
            value={form.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            placeholder="Alya"
          />
        </label>
        <label>
          Last name
          <input
            required
            value={form.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
            placeholder="Pratama"
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="alya@mail.com"
          />
        </label>
        <label>
          Phone
          <input
            required
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            placeholder="+62 812 0000"
          />
        </label>
        <label>
          City
          <input
            required
            value={form.city}
            onChange={(event) => updateField('city', event.target.value)}
            placeholder="Jakarta"
          />
        </label>
        <label>
          Country
          <input
            required
            value={form.country}
            onChange={(event) => updateField('country', event.target.value)}
            placeholder="Indonesia"
          />
        </label>
      </div>

      <div className="form-actions">
        {editingContact && (
          <button className="text-button" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
        <button className="primary-button" type="submit">
          <Save size={18} />
          {editingContact ? 'Save changes' : 'Add contact'}
        </button>
      </div>
    </form>
  )
}
