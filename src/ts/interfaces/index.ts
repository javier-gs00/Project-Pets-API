export interface Store {
  _id: string
  name: string
  url: string
  email: StoreEmail[]
  address: StoreAddress[]
  phone: StorePhone[]
  open_hours: StoreOpenHours[]
  grooming: boolean
  veterinary: boolean
  urgency: boolean
  physical_store: boolean
  product_shipping: boolean
  image_file_name: string
  image_url: string
}

export interface StoreEmail {
  name: string
  uri: string
}

export interface StoreAddress {
  street: string
  commune: string
  cityTown: string
  region: string
  latitude: number
  longitude: number
}

export interface StorePhone {
  name: string
  number: number
}

export interface StoreOpenHours {
  range: string
  open: string
  close: string
}