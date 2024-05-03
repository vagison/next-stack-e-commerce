// configInterfaces.ts

interface DBConfig {
  dbUser: string | undefined
  dbPassword: string | undefined
  dbName: string | undefined
  dbUri: string
  isDebugEnabled: boolean
}

interface CorsConfig {
  origin: string[]
  credentials: boolean
}

export { DBConfig, CorsConfig }
