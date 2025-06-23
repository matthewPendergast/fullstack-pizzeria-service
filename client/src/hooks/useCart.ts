import { useAuth } from "../context/useAuth.ts";
import { useLocalCart } from "./useLocalCart.ts";
import { useServerCart } from "./useServerCart.ts";
import { CartItem } from "./useLocalCart.ts";

interface CartHook {
	cart: CartItem[];
	addItem: (item: CartItem) => void;
	updateQuantity: (id: number, qty: number) => void;
	removeItem: (id: number) => void;
	clearCart: () => void;
	loading?: boolean;
}

export const useCart = (): CartHook => {
	const { user, loading } = useAuth();

	const local = useLocalCart();
	const server = useServerCart();

	if (loading) {
		return {
			cart: [],
			addItem: () => {},
			updateQuantity: () => {},
			removeItem: () => {},
			clearCart: () => {},
			loading: true,
		};
	}

	return user ? server : local;
};
