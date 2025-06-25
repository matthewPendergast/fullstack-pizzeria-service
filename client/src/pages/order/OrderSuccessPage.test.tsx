import { screen, render, act } from "@testing-library/react";
import OrderSuccessPage from "./OrderSuccessPage.tsx";
import { AuthProvider } from "../../context/AuthContext.tsx";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const customRender = async (ui: React.ReactElement, initialEntries: any[]) => {
	await act(async () => {
		render(
			<AuthProvider>
				<MemoryRouter initialEntries={initialEntries}>
					<Routes>
						<Route path="/" element={<p>Home Page</p>} />
						<Route path="/order-success" element={ui} />
					</Routes>
				</MemoryRouter>
			</AuthProvider>,
		);
	});
};

describe("OrderSuccessPage", () => {
	it("redirects to home page if no orderId is provided", async () => {
		await customRender(<OrderSuccessPage />, [
			{ pathname: "/order-success", state: {} },
		]);

		expect(screen.getByText(/home page/i)).toBeInTheDocument();
	});

	it("renders order success message with orderId", async () => {
		await customRender(<OrderSuccessPage />, [
			{ pathname: "/order-success", state: { orderId: "abc123" } },
		]);

		expect(screen.getByText(/thank you!/i)).toBeInTheDocument();
		expect(
			screen.getByText(/your order has been placed successfully/i),
		).toBeInTheDocument();
		expect(screen.getByText(/order id:/i)).toBeInTheDocument();
		expect(screen.getByText(/abc123/)).toBeInTheDocument();
	});
});
