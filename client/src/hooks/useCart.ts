import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth.ts";

export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

type Cart = CartItem[];

const getCartKey = (userId: number | null) =>
	userId ? `cart-user-${userId}` : "cart-anon";

export const useCart = () => {
	const { user } = useAuth();
	const [cart, setCart] = useState<Cart>([]);
	const [initialized, setInitialized] = useState(false);

	const cartKey = getCartKey(user?.id ?? null);

	// Load cart from localStorage
	useEffect(() => {
		const stored = localStorage.getItem(cartKey);
		if (stored) {
			const parsed = JSON.parse(stored) as CartItem[];

			const normalized = parsed.map((item) => ({
				...item,
				price: Number(item.price),
				quantity: Number(item.quantity),
			}));

			setCart(normalized);
		} else {
			setCart([]);
		}
		setInitialized(true);
	}, [cartKey]);

	// Save to localStorage only after initial load
	useEffect(() => {
		if (initialized) {
			localStorage.setItem(cartKey, JSON.stringify(cart));
		}
	}, [cart, cartKey, initialized]);

	const addItem = (item: CartItem) => {
		setCart((prev) => {
			const existing = prev.find((i) => i.id === item.id);
			if (existing) {
				return prev.map((i) =>
					i.id === item.id
						? { ...i, quantity: i.quantity + item.quantity }
						: i,
				);
			}
			return [...prev, item];
		});
	};

	const removeItem = (itemId: number) => {
		setCart((prev) => prev.filter((item) => item.id !== itemId));
	};

	const updateQuantity = (itemId: number, quantity: number) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === itemId ? { ...item, quantity } : item,
			),
		);
	};

	const clearCart = () => {
		setCart([]);
		localStorage.removeItem(cartKey);
	};

	return {
		cart,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
	};
};
