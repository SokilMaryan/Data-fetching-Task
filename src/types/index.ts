export interface IContact {
  id: number
  name: string
  description: string
  image?: string
}

export interface IContactAdd {
  name: string
  description: string
}

export interface IContactUpdate {
  id: number
  name: string
  description: string
}
