import { IncomingMessage, ServerResponse } from 'node:http'

import { HttpException } from '../exceptions/http-exception'
import { HttpStatus, IUserWithoutId } from '../types'
import { Service } from './service'
import { validateId, validateUser } from './validation'

export class Controller {
  service: Service = new Service()

  public getAll(req: IncomingMessage, res: ServerResponse) {
    try {
      const users = this.service.getAll()

      res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(users))
    } catch {
      res.writeHead(HttpStatus.BAD_REQUEST, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify({ message: 'Something went wrong' }))
    }
  }

  public getOne(req: IncomingMessage, res: ServerResponse) {
    try {
      const userId = req.url?.split('/')[3] || ''
      validateId(userId)

      const user = this.service.getOne(userId)

      res.writeHead(HttpStatus.OK, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(user))
    } catch (error) {
      if (error instanceof HttpException) {
        res.writeHead(error.status, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({ message: error.message }))
      }
    }
  }

  public create(req: IncomingMessage, res: ServerResponse) {
    let str = ''
    req.on('data', (chunk) => {
      str += chunk
    })

    req.on('end', () => {
      try {
        const body = JSON.parse(str) as IUserWithoutId
        validateUser(body)

        const newUser = this.service.create(body)

        res.writeHead(HttpStatus.CREATED, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify(newUser))
      } catch (error) {
        if (error instanceof HttpException) {
          res.writeHead(error.status, {
            'Content-Type': 'application/json',
          })
          res.end(JSON.stringify({ message: error.message }))
        }
      }
    })
  }

  public update(req: IncomingMessage, res: ServerResponse) {
    let str = ''

    req.on('data', (chunk) => {
      str += chunk
    })

    req.on('end', () => {
      try {
        const userId = req.url?.split('/')[3] ?? ''
        validateId(userId)
        const body = JSON.parse(str) as IUserWithoutId
        validateUser(body)

        const updatedUser = this.service.update(userId, body)

        res.writeHead(HttpStatus.OK, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify(updatedUser))
      } catch (error) {
        if (error instanceof HttpException) {
          res.writeHead(error.status, {
            'Content-Type': 'application/json',
          })
          res.end(JSON.stringify({ message: error.message }))
        }
      }
    })
  }

  public delete(req: IncomingMessage, res: ServerResponse) {
    try {
      const userId = req.url?.split('/')[3] || ''
      validateId(userId)
      this.service.delete(userId)
    } catch (error) {
      if (error instanceof HttpException) {
        res.writeHead(error.status, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({ message: error.message }))
      }
    }
  }
}
