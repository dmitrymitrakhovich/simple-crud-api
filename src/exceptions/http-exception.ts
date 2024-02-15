import { HttpStatus } from '../types';

export class HttpException extends Error {
	constructor(
		public readonly message: string,
		public readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
	) {
		super(message);
	}
}
