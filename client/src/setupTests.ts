import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

if (!globalThis.TextEncoder) globalThis.TextEncoder = TextEncoder;
if (!globalThis.TextDecoder) globalThis.TextDecoder = TextDecoder;

beforeEach(() => {
	global.fetch = jest.fn((url: string, options?: RequestInit) => {
		if (url === "/api/auth/me") {
			return Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ id: 1, username: "testuser123" }),
			});
		}

		if (url === "/api/auth/login") {
			return Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ error: "Invalid credentials" }),
			});
		}

		if (url === "/api/auth/signup") {
			return Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({
						id: 1,
						username: "testuser123",
					}),
			});
		}

		throw new Error(`Unhandled fetch request to: ${url}`);
	}) as jest.Mock;
});
