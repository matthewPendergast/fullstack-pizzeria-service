import { screen, fireEvent } from "@testing-library/react";
import CartPage from "./CartPage.tsx";
import { renderWithWrapper } from "../../__tests__/test-utils.tsx";
import { useCart } from "../../hooks/useCart.ts";

jest.mock("../../hooks/useCart");

const mockedUseCart = useCart as jest.Mock;

describe("CartPage", () => {
	it("renders empty cart message when cart is empty", async () => {
		mockedUseCart.mockReturnValue({
			cart: [],
			updateQuantity: jest.fn(),
			removeItem: jest.fn(),
			clearCart: jest.fn(),
		});

		await renderWithWrapper(<CartPage />);
		expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
	});

	it("renders cart items correctly", async () => {
		mockedUseCart.mockReturnValue({
			cart: [{ id: 1, name: "Cheese Pizza", price: 10.5, quantity: 2 }],
			updateQuantity: jest.fn(),
			removeItem: jest.fn(),
			clearCart: jest.fn(),
		});

		await renderWithWrapper(<CartPage />);
		expect(screen.getByText(/cheese pizza/i)).toBeInTheDocument();
		expect(screen.getByDisplayValue("2")).toBeInTheDocument();
		expect(screen.getByText(/\$10\.50/i)).toBeInTheDocument();
		expect(screen.getByText(/subtotal: \$21.00/i)).toBeInTheDocument();
		expect(screen.getByText(/^Total: \$21\.00$/)).toBeInTheDocument();
	});

	it("updates quantity when input is changed", async () => {
		const updateQuantity = jest.fn();
		mockedUseCart.mockReturnValue({
			cart: [{ id: 1, name: "Cheese Pizza", price: 10, quantity: 1 }],
			updateQuantity,
			removeItem: jest.fn(),
			clearCart: jest.fn(),
		});

		await renderWithWrapper(<CartPage />);
		const input = screen.getByDisplayValue("1");
		fireEvent.change(input, { target: { value: "3" } });
		expect(updateQuantity).toHaveBeenCalledWith(1, 3);
	});

	it("removes item when Remove button is clicked", async () => {
		const removeItem = jest.fn();
		mockedUseCart.mockReturnValue({
			cart: [{ id: 1, name: "Cheese Pizza", price: 10, quantity: 1 }],
			updateQuantity: jest.fn(),
			removeItem,
			clearCart: jest.fn(),
		});

		await renderWithWrapper(<CartPage />);
		fireEvent.click(screen.getByText(/remove/i));
		expect(removeItem).toHaveBeenCalledWith(1);
	});

	it("clears cart when Clear Cart button is clicked", async () => {
		const clearCart = jest.fn();
		mockedUseCart.mockReturnValue({
			cart: [{ id: 1, name: "Cheese Pizza", price: 10, quantity: 1 }],
			updateQuantity: jest.fn(),
			removeItem: jest.fn(),
			clearCart,
		});

		await renderWithWrapper(<CartPage />);
		fireEvent.click(screen.getByText(/clear cart/i));
		expect(clearCart).toHaveBeenCalled();
	});
});
