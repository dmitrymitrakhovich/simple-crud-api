import request from 'supertest'

import { Application } from '../application'
import { IUserWithoutId } from '../types'

const { server } = new Application()

const user: IUserWithoutId = {
  username: 'User',
  age: 20,
  hobbies: ['Node.js', 'React'],
}

const updatedUser: IUserWithoutId = {
  username: 'Updated User',
  age: 21,
  hobbies: ['Node.js', 'React', 'Angular'],
}

let userUUID = ''
const fakeUUID = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

describe('/api/users', () => {
  test('should return an empty array of users', async () => {
    const response = await request(server).get('/api/users')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test('should create a new user', async () => {
    const response = await request(server).post('/api/users').send(user)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    userUUID = response.body.id

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: userUUID,
      ...user,
    })
  })

  test('should return an error if missing required field during creating', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({
        age: 20,
        hobbies: ['Node.js', 'React'],
      })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Missing required field' })
  })

  it('should return an error if hobbies  is not an array of string', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({ ...user, hobbies: [1234, true, 'Node.js'] })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Invalid type for fields' })
  })

  test('should return array of users', async () => {
    const response = await request(server).get('/api/users')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ id: userUUID, ...user }])
  })

  test('should return a single user', async () => {
    const response = await request(server).get(`/api/users/${userUUID}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ ...user, id: userUUID })
  })

  test('should return an error if user not found during getting', async () => {
    const response = await request(server).get(`/api/users/${fakeUUID}`)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'User not found' })
  })

  test('should return an error if invalid id during creating', async () => {
    const response = await request(server).get('/api/users/1234')
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Not valid UUID' })
  })

  test('should update a user', async () => {
    const response = await request(server)
      .put(`/api/users/${userUUID}`)
      .send(updatedUser)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: userUUID,
      ...updatedUser,
    })
  })

  test('should return an error if invalid id during updating', async () => {
    const response = await request(server)
      .put('/api/users/1234')
      .send(updatedUser)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Not valid UUID' })
  })

  test('should return an error if user not found during updating', async () => {
    const response = await request(server)
      .put(`/api/users/${fakeUUID}`)
      .send(updatedUser)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'User not found' })
  })

  test('should return an error if missing required field during updating', async () => {
    const response = await request(server)
      .put(`/api/users/${userUUID}`)
      .send({
        age: 20,
        hobbies: ['Node.js', 'React'],
      })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Missing required field' })
  })

  test('should return an error if user not found during updating', async () => {
    const response = await request(server).delete(`/api/users/${fakeUUID}`)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'User not found' })
  })

  test('should delete a user', async () => {
    const response = await request(server).delete(`/api/users/${userUUID}`)
    expect(response.status).toBe(204)
    const users = await request(server).get('/api/users')
    expect(users.body).toEqual([])
  })

  test('should return an error if route not found', async () => {
    const response = await request(server).get('/api/posts')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Not found' })
  })
})
