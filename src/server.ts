import { createServer } from 'unicore'
import { ctrl } from './app/controllers'
import logger from './app/logger'
import * as hello from './app/services/helloService'
import * as heroes from './app/services/heroesService'

const server = createServer()
server.use(logger.express)
server.use(ctrl.json)
server.use(ctrl.cors)
server.all('/', ctrl.httpRootHandler)
server.use(ctrl.healthz)

server.all('/hello', ctrl.service(hello.hello))
server.get('/heroes-statistics', ctrl.service(heroes.statistics))

server.use(ctrl.httpErrorHandler)
server.use(ctrl.httpFinalHandler)

export default server
