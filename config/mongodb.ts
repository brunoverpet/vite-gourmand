import env from '#start/env'

const dbConfig = {
  mongo_uri: env.get('MONGO_URI'),
}

export default dbConfig
