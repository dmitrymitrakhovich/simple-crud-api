import { validate } from 'uuid';

import { HttpException } from '../exceptions/http-exception';
import { HttpStatus, IUserWithoutId } from '../types';

export const validateId = (id: string) => {
	const isValidUUID = validate(id);

	if (!isValidUUID) {
		throw new HttpException('Not valid UUID', HttpStatus.BAD_REQUEST);
	}
};
export const validateUser = (body: IUserWithoutId) => {
	const isAllFieldsInBody = body.username && body.age && body.hobbies;
	const isCorrectFieldsType =
		typeof body.username === 'string' &&
		typeof body.age === 'number' &&
		Array.isArray(body.hobbies) &&
		body.hobbies.every((el) => typeof el === 'string');

	if (!isAllFieldsInBody) {
		throw new HttpException('Missing required field', HttpStatus.BAD_REQUEST);
	} else if (!isCorrectFieldsType) {
		throw new HttpException('Invalid type for fields', HttpStatus.BAD_REQUEST);
	}
};
