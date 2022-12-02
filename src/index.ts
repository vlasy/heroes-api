import logger from './app/logger'
import config, { safeConfig } from './config'
import server from './server'
import * as shutdown from './app/shutdown'
import { AppDataSource } from './app/database/data-source'

logger.info(safeConfig, 'Loaded config')
server
  .listenAsync(config.server.port)
  .then(() => logger.info(`Server started, port=${config.server.port}`))
  .then(() => AppDataSource.initialize())
  .then(() => logger.info('Database initialized'))
  .catch((error: Error) => {
    logger.error('Server failed to start', error)
    process.exit(1)
  })

shutdown.prepareForGracefulShutdown()

export default server
