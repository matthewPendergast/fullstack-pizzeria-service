import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage.tsx";
import { MemoryRouter } from "react-router-dom";

const mockedFetch = jest.fn();

beforeEach(() => {
	globalThis.fetch = mockedFetch;
});

describe("LoginPage", () => {
	it("should render login form inputs", () => {
		render(<LoginPage />, { wrapper: MemoryRouter });
		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
	});

	it("should display error message on failed login", async () => {
		mockedFetch.mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: "Invalid credentials" }),
		});

		render(<LoginPage />, { wrapper: MemoryRouter });

		fireEvent.change(screen.getByPlaceholderText(/email/i), {
			target: { value: "fail@example.com" },
		});
		fireEvent.change(screen.getByPlaceholderText(/password/i), {
			target: { value: "wrong" },
		});
		fireEvent.click(screen.getByRole("button", { name: /log in/i }));

		await waitFor(() => {
			expect(
				screen.getByText(/invalid credentials/i),
			).toBeInTheDocument();
		});
	});
});
