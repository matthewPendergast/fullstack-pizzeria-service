import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "./SignupPage.tsx";

const testUser = {
	username: "testuser123",
	email: "test@example.com",
	password: "password123",
};

beforeEach(() => {
	globalThis.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () =>
				Promise.resolve({
					id: 1,
					username: testUser.username,
				}),
		}),
	) as jest.Mock;
});

describe("Signup page", () => {
	it("should render all input fields", () => {
		render(<SignupPage />);
		expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
	});

	it("should submit form and display success message", async () => {
		render(<SignupPage />);
		fireEvent.change(screen.getByPlaceholderText(/username/i), {
			target: { value: testUser.username },
		});
		fireEvent.change(screen.getByPlaceholderText(/email/i), {
			target: { value: testUser.email },
		});
		fireEvent.change(screen.getByPlaceholderText(/password/i), {
			target: { value: testUser.password },
		});

		fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

		await waitFor(() => {
			expect(screen.getByText(/Success!/i)).toBeInTheDocument();
		});
	});
});
