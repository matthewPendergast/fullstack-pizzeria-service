import { screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage.tsx";
import { renderWithWrapper } from "../../__tests__/test-utils.tsx";

describe("LoginPage", () => {
	it("should render login form inputs", async () => {
		await renderWithWrapper(<LoginPage />);
		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
	});

	it("should display error message on failed login", async () => {
		await renderWithWrapper(<LoginPage />);

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
