import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth.ts";

export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

type Cart = CartItem[];

export const useServerCart = () => {
	const [cart, setCart] = useState<Cart>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		if (!user) return;

		const fetchCart = async () => {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/cart`,
					{
						credentials: "include",
					},
				);
				if (!res.ok) throw new Error("Failed to fetch cart.");
				const rawData = await res.json();
				const normalized = rawData.map((item) => ({
					...item,
					price: Number(item.price),
					quantity: Number(item.quantity),
				}));
				setCart(normalized);
			} catch (err) {
				console.error("useServerCart: fetch error", err);
			} finally {
				setLoading(false);
			}
		};
		fetchCart();
	}, []);

	const addItem = async (item: CartItem) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					item_id: item.id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				}),
			});
			if (!res.ok) throw new Error("Failed to add item");

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
		} catch (err) {
			console.error("addItem error", err);
		}
	};

	const updateQuantity = async (itemId: number, quantity: number) => {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/cart/${itemId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ quantity }),
				},
			);
			if (!res.ok) throw new Error("Failed to update item");
			setCart((prev) =>
				prev.map((item) =>
					item.id === itemId ? { ...item, quantity } : item,
				),
			);
		} catch (err) {
			console.error("updateQuantity error", err);
		}
	};

	const removeItem = async (itemId: number) => {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/cart/${itemId}`,
				{
					method: "DELETE",
					credentials: "include",
				},
			);
			if (!res.ok) throw new Error("Failed to delete item");
			setCart((prev) => prev.filter((item) => item.id !== itemId));
		} catch (err) {
			console.error("removeItem error", err);
		}
	};

	const clearCart = async () => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
				method: "DELETE",
				credentials: "include",
			});
			if (!res.ok) throw new Error("Failed to clear cart");

			setCart([]);

			if (user?.id) {
				localStorage.removeItem(`cart-user-${user.id}`);
			}
		} catch (err) {
			console.error("clearCart error", err);
		}
	};

	return {
		cart,
		addItem,
		updateQuantity,
		removeItem,
		clearCart,
		loading,
	};
};
