import { IUser } from '../types';

export class Repository {
	private database: IUser[] = [];

	public getAll() {
		return this.database;
	}

	public getOne(id: string) {
		return this.database.find((u) => u.id === id);
	}

	public create(newUser: IUser) {
		this.database.push(newUser);
		return newUser;
	}

	public update(updatedUser: IUser) {
		const index = this.database.findIndex((u) => u.id === updatedUser.id);
		this.database[index] = updatedUser;
		return updatedUser;
	}

	public delete(id: string) {
		const index = this.database.findIndex((u) => u.id === id);
		this.database.splice(index, 1);
		return this.database;
	}
}
