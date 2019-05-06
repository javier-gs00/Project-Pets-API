import mongoose from 'mongoose'

async function initDB(): Promise<void> {
  mongoose.Promise = global.Promise
  mongoose.connection.on('connecting', () => console.log('DB connection being established'))
  mongoose.connection.on('connected', () => console.log('DB connection established'))
  mongoose.connection.on('reconnected', () => console.log('DB connection re established'))
  mongoose.connection.on('disconnected', () => console.log('DB connection disconnected'))
  mongoose.connection.on('close', () => console.log('DB connection closed'))
  mongoose.connection.on('error', (err) => console.log('DB connection error', err))
  const dbUrl: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/projectpets'
  await mongoose.connect(dbUrl, { useNewUrlParser: true })
}

export default { init: initDB }
