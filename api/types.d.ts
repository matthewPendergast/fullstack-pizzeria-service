declare namespace Express {
	export interface Request {
		user: any = {
			id: number
		}
	}
	export interface Response {
		user: any;
	}
}
