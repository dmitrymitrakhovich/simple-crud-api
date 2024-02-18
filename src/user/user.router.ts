import { IncomingMessage, ServerResponse } from 'node:http'

import { HttpStatus } from '../types'
import { Controller } from './user.controller'

export class Router {
  private controller: Controller = new Controller()

  public request(req: IncomingMessage, res: ServerResponse) {
    const url = req.url
    const method = req.method

    console.log(`[${method}] ${url}`)

    const id = url?.split('/')[3] || ''

    if (req.method === 'GET' && req.url === '/api/users') {
      return this.controller.getAll(req, res)
    } else if (req.method === 'GET' && req.url === `/api/users/${id}`) {
      return this.controller.getOne(req, res)
    } else if (req.method === 'POST' && req.url === '/api/users') {
      return this.controller.create(req, res)
    } else if (req.method === 'PUT' && req.url === `/api/users/${id}`) {
      return this.controller.update(req, res)
    } else if (req.method === 'DELETE' && req.url === `/api/users/${id}`) {
      return this.controller.delete(req, res)
    } else {
      res.writeHead(HttpStatus.NOT_FOUND, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          message: `Not found`,
        }),
      )
    }
  }
}
