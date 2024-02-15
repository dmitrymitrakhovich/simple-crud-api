import http, { IncomingMessage, Server, ServerResponse } from 'http';

import { HttpException } from './exceptions/http-exception';
import { HttpStatus } from './types';
import { Router } from './user/router';

export class Application {
	private server: Server = this.createServer();
	private router: Router = new Router();

	private createServer() {
		try {
			return http.createServer((req: IncomingMessage, res: ServerResponse) => {
				this.router.request(req, res);
			});
		} catch (error) {
			throw new HttpException(
				'Something went wrong',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	public listen(port: number, cb: () => void) {
		this.server.listen(port, cb);
	}
}
