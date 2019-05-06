import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StoreSchema = new Schema({
  name: { type: String, require: true },
  url: { type: String, require: true },
  email: [
    {
      name: { type: String, require: true },
      uri: { type: String, require: true }
    }
  ],
  address: [
    {
      street: { type: String, require: true },
      commune: { type: String, require: true },
      cityTown: { type: String, require: true },
      region: { type: String, require: true },
      latitude: { type: Number },
      longitude: { type: Number }
    }
  ],
  phone: [
    {
      name: { type: String, require: true },
      number: { type: Number, require: true }
    }
  ],
  open_hours: [
    {
      range: { type: String, require: true },
      open: { type: String, require: true },
      close: { type: String, require: true }
    }
  ],
  grooming: { type: Boolean, require: true, default: false },
  veterinary: { type: Boolean, require: true, default: false },
  urgency: { type: Boolean, require: true, default: false },
  physical_store: { type: Boolean, require: true, default: false },
  product_shipping: { type: Boolean, require: true, default: false },
  image_file_name: { type: String },
  image_url: { type: String }
})

export default mongoose.model('Store', StoreSchema)
