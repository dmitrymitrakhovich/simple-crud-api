import { v4 as uuidv4 } from 'uuid'

import { IUser } from '../types'

export class User implements IUser {
  public id: string
  constructor(
    public username: string,
    public age: number,
    public hobbies: string[],
  ) {
    this.id = uuidv4()
  }
}
