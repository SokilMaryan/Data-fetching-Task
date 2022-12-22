import type { IContact, IContactAdd, IContactUpdate } from '@/types'

class ContactsService {
  // rest/v1/contacts
  getContacts () {
    return useHttp.get<IContact[]>('rest/v1/contacts')
  }

  addContact (payload: IContactAdd) {
    return useHttp.post('rest/v1/contacts', payload)
  }

  updateContact (payload: IContactUpdate) {
    return useHttp.patch(`rest/v1/contacts?id=eq.${payload.id}`, payload)
  }

  deleteContact (payload: IContactUpdate) {
    return useHttp.delete(`rest/v1/contacts?id=eq.${payload.id}`)
  }
  //   щоб реалізувати реєстрацію юзера вам потрібно виконати реквест:
  // POST - "auth/v1/signup", payload: {
  //   "email": "someone@email.com",
  //   "password": "MmKjRZtHICQHnwkjxIVg"
  // }

  // щоб додати контакт:
  // POST - "rest/v1/contacts", payload: {
  //     name: contact_name,
  //     description: 'contact_description'
  //   }

  // щоб змінити контакт:
  // PATCH - rest/v1/contacts?id=eq.${contact.id}, payload: {
  //     id: contact_id,
  //     name: contact_name,
  //     description: 'contact_description'
  //   }

// щоб видалити контакт:
// DELETE - rest/v1/contacts?id=eq.${contact.id}
}

export const contactsService = new ContactsService()
