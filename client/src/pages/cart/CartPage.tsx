import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart.ts";
import { CartItem } from "../../hooks/useLocalCart.ts";
import { useAuth } from "../../context/useAuth.ts";

const CartPage = () => {
	const { cart, updateQuantity, removeItem, clearCart } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();

	const total = (cart as CartItem[])
		.reduce((sum, item) => sum + item.price * item.quantity, 0)
		.toFixed(2);

	const handleCheckout = async () => {
		if (!user) {
			navigate("/login");
			return;
		}
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.error || "Checkout failed");

			navigate("/order-success", { state: { orderId: data.orderId } });
			clearCart();
		} catch (err: any) {
			console.error("Checkout error:", err);
			alert(`Checkout failed: ${err.message}`);
		}
	};

	return (
		<div className="mx-auto max-w-3xl p-4">
			<h1 className="mb-4 text-2xl font-bold">Your Cart</h1>

			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<ul className="space-y-4">
						{cart.map((item) => (
							<li
								key={item.id}
								className="flex items-center justify-between border-b pb-2"
							>
								<div>
									<h2 className="font-semibold">
										{item.name}
									</h2>
									<p>
										${item.price.toFixed(2)} ×{" "}
										{item.quantity}
									</p>
									<p className="text-sm text-gray-600">
										Subtotal: $
										{(item.price * item.quantity).toFixed(
											2,
										)}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="number"
										min="1"
										value={item.quantity}
										onChange={(e) =>
											updateQuantity(
												item.id,
												Number(e.target.value),
											)
										}
										className="w-16 rounded border px-2 py-1"
									/>
									<button
										onClick={() => removeItem(item.id)}
										className="text-red-500 hover:underline"
									>
										Remove
									</button>
								</div>
							</li>
						))}
					</ul>

					<div className="mt-6 flex items-center justify-between">
						<p className="text-xl font-bold">Total: ${total}</p>
						<div className="space-x-2">
							<button
								onClick={clearCart}
								className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
							>
								Clear Cart
							</button>
							<button
								onClick={handleCheckout}
								className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CartPage;
