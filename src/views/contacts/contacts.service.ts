import type { IContact, IContactAdd, IContactUpdate } from '@/types'

class ContactsService {
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
}

export const contactsService = new ContactsService()
