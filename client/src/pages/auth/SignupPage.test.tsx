import { screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "./SignupPage.tsx";
import { renderWithWrapper } from "../../__tests__/test-utils.tsx";

const testUser = {
	username: "testuser123",
	email: "test@example.com",
	password: "password123",
};

describe("Signup page", () => {
	it("should render all input fields", async () => {
		await renderWithWrapper(<SignupPage />);
		expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
	});

	it("should submit form and display success message", async () => {
		await renderWithWrapper(<SignupPage />);

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

	it("should display error message on failed signup", async () => {
		const fetchMock = global.fetch as jest.Mock;

		fetchMock.mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ id: 1, username: "testuser123" }),
			}),
		);

		fetchMock.mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ error: "Signup failed" }),
			}),
		);

		await renderWithWrapper(<SignupPage />);

		fireEvent.change(screen.getByPlaceholderText(/username/i), {
			target: { value: "failuser" },
		});
		fireEvent.change(screen.getByPlaceholderText(/email/i), {
			target: { value: "fail@example.com" },
		});
		fireEvent.change(screen.getByPlaceholderText(/password/i), {
			target: { value: "badpass" },
		});

		fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

		await waitFor(() => {
			expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
		});
	});
});
