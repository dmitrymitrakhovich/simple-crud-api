import { HttpException } from '../exceptions/http-exception'
import { HttpStatus, IUserWithoutId } from '../types'
import { User } from './model'
import { Repository } from './repository'

export class Service {
  private repository: Repository = new Repository()
  public getAll() {
    return this.repository.getAll()
  }

  public getOne(id: string) {
    const user = this.repository.getOne(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return user
  }

  public create(body: IUserWithoutId) {
    const newUser = new User(body.username, body.age, body.hobbies)
    this.repository.create(newUser)

    return newUser
  }

  public update(id: string, body: IUserWithoutId) {
    this.getOne(id)

    const updatedUser = this.repository.update({ ...body, id })

    return updatedUser
  }

  public delete(id: string) {
    this.getOne(id)
    this.repository.delete(id)
  }
}
