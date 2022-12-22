interface IContact {
  id: number
  name: string
  description: string
  image?: string
}


interface IContactAdd {
  name: string
  description: string
}


interface IContactUpdate {
  id: number
  name: string
  description: string
}