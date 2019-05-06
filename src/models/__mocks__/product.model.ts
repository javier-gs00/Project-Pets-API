import { Product } from 'Src/ts/interfaces'

const testProduct: Product = {
  animal: "perro",
  _id: "5a3a8f19a5dd062ccca49c2f",
  __v: 0,
  name: "royal canin maxi adulto 5 15 kg.",
  url: "https://www.tiendapet.cl/catalogo/producto/22/royal-canin-maxi-adulto-5",
  price: 43900,
  imageUrl: "https://tiendapet02.akamaized.net/assets/uploads/productos/47c10-royalcanin-(1).jpg",
  store: "Tienda Pet",
  category: "comida",
  date: new Date("2017-12-20T16:19:35.037Z")
}

export default {
  find: () => {
    return new Promise((resolve, reject) => {
      if (process.env.FORCE_TEST_FAILS === 'true') reject('ProductModel find method mocked message')
      resolve([testProduct])
    })
  },
  findById: () => {
    return new Promise((resolve, reject) => {
      if (process.env.FORCE_TEST_FAILS === 'true') reject('ProductModel findById method mocked message')
      resolve(testProduct)
    })
  },
  deleteOne: () => {
    return new Promise((resolve, reject) => {
      if (process.env.FORCE_TEST_FAILS === 'true') reject('ProductModel deleteOne method mocked message')
      resolve()
    })
  },
  deleteMany: () => {
    return new Promise((resolve, reject) => {
      if (process.env.FORCE_TEST_FAILS === 'true') reject('ProductModel deleteMany method mocked message')
      resolve()
    })
  },
  findOneAndUpdate: () => {
    return new Promise((resolve, reject) => {
      if (process.env.FORCE_TEST_FAILS === 'true') reject('ProductModel findOneAndUpdate method mocked message')
      resolve(testProduct)
    })
  }
}