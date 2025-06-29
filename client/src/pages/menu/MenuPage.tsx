import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart.ts";

interface MenuItem {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	image_url: string | null;
	created_at: string;
}

const MenuPage = () => {
	const [menu, setMenu] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { addItem } = useCart();

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/menu`);
				if (!res.ok) throw new Error("Failed to fetch menu.");
				const data = await res.json();
				setMenu(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMenu();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="h-screen bg-[#181818] p-4">
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
				{menu.map((item) => (
					<div
						key={item.id}
						className="rounded-xl border bg-[#2A2A2A] p-4 shadow"
					>
						<h2 className="text-xl font-semibold text-gray-300">
							{item.name}
						</h2>
						<p className="text-gray-400">{item.description}</p>
						<p className="mt-2 font-bold text-red-900">
							${item.price}
						</p>
						<button
							onClick={() => {
								console.log({ ...item });
								addItem({ ...item, quantity: 1 });
							}}
							className="mt-2 w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
						>
							Add to Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default MenuPage;
