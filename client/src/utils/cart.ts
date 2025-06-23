export const mergeAnonCart = async (userId: number) => {
	const anonCart = localStorage.getItem("cart-anon");
	if (!anonCart) return;

	const userCartKey = `cart-user-${userId}`;
	const existingUserCart = localStorage.getItem(userCartKey);

	let merged: any[] = JSON.parse(anonCart);

	if (existingUserCart) {
		const existingItems = JSON.parse(existingUserCart);
		for (const item of existingItems) {
			const match = merged.find((i) => i.id === item.id);
			if (match) {
				match.quantity += item.quantity;
			} else {
				merged.push(item);
			}
		}
	}

	localStorage.setItem(userCartKey, JSON.stringify(merged));
	localStorage.removeItem("cart-anon");

	try {
		await fetch("/api/cart/merge", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(merged),
		});
		localStorage.removeItem(userCartKey);
	} catch (err) {
		console.error(
			"mergeAnonCart: failed to push merged cart to server",
			err,
		);
	}
};
