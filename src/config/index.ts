import dotenv from 'dotenv'
import { DBConfig, CorsConfig } from '../interfaces/config/config'

dotenv.config()

const dbConfig: DBConfig = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  isDebugEnabled: process.env.DB_DEBUG === 'true',
}

// const refreshTokenConfig = {
//   key: process.env.REFRESH_TOKEN_KEY || 'refreshToken',
//   requireSecure: process.env.REFRESH_TOKEN_REQUIRE_SECURE === 'true',
//   maxAge: +process.env.REFRESH_TOKEN_MAX_AGE || REFRESH_TOKEN_MAX_AGE,
//   domain: process.env.REFRESH_TOKEN_DOMAIN || 'localhost',
// }

// const jwtConfig = {
//   secret: process.env.JWT_SECRET || 'keyboard-cat',
//   expiresIn: +process.env.JWT_EXPIRES_IN || 900,
// }

const corsConfig: CorsConfig = {
  origin: [process.env.CORS_ORIGIN] as any,
  credentials: true,
}

// export { dbConfig, corsConfig, jwtConfig, mailConfig, refreshTokenConfig, awsConfig }
export { dbConfig, corsConfig }
