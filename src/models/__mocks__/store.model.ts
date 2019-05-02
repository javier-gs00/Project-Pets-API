import { Store } from 'Src/ts/interfaces'

const testStore: Store = {
  grooming: true,
  veterinary: true,
  urgency: false,
  physical_store: true,
  product_shipping: true,
  _id: '5a40022fb0091572150c5baa',
  name: 'Pet Happy',
  url: 'https://www.pethappy.cl',
  email: [
    {
      name: 'contacto',
      uri: 'ecommerce@pethappy.cl'
    }
  ],
  address: [
    {
      street: 'Av. Américo Vespucio 7500 Local B3',
      commune: 'La Florida',
      cityTown: 'Santiago',
      region: 'RM',
      latitude: 0,
      longitude: 0
    }
  ],
  phone: [
    {
      name: 'contacto',
      number: 222276171
    }
  ],
  open_hours: [
    {
      range: 'Lunes a Domingo',
      open: '10:00',
      close: '21:00'
    }
  ],
  image_file_name: 'pethappy.png',
  image_url: 'https://assets.jumpseller.com/store/pethappy/themes/25289/logo1.png?1391097664' 
}

export default {
  find: () => {
    return new Promise((resolve, reject) => {
      if (process.env.FORCE_TEST_FAILS === 'true') reject('StoreModel find method mocked message')
      resolve([testStore])
    })
  }
}