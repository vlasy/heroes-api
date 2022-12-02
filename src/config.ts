import { createLoader, safeValues, values } from 'configuru'
import { Level } from 'pino'

const loader = createLoader({
  defaultConfigPath: '.env.jsonc',
})

const configSchema = {
  logger: {
    defaultLevel: loader.custom(x => x as Level)('LOGGER_DEFAULT_LEVEL'),
    pretty: loader.bool('LOGGER_PRETTY'),
  },
  auth: {
    directBearerAuth: loader.bool('AUTH_DIRECT_BEARER_ENABLED'),
  },
  enableTests: loader.bool('ENABLE_TESTS'),
  node: {
    env: loader.string('NODE_ENV'),
  },
  server: {
    port: loader.number('SERVER_PORT'),
    allowResponseErrors: loader.bool('SERVER_ALLOW_RESPONSE_ERRORS'),
    corsHeaders: loader.string('SERVER_CORS_ALLOW_HEADERS'),
    corsOrigins: loader.string('SERVER_CORS_ALLOW_ORIGINS'),
  },
  database: {
    host: loader.string('DB_HOST'),
    port: loader.number('DB_PORT'),
    database: loader.string('DB_DATABASE_NAME'),
    username: loader.string('DB_USERNAME'),
    password: loader.string.hidden('DB_PASSWORD'),
  }
}

export default values(configSchema)
export const safeConfig = safeValues(configSchema)
