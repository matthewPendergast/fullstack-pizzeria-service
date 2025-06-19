import { createContext, useContext, useEffect, useState } from "react";
import { mergeAnonCart } from "../utils/cart.ts";

interface AuthUser {
	id: number;
	username: string;
}

export interface AuthContextType {
	user: AuthUser | null;
	loading: boolean;
	setUser: (user: AuthUser | null) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch("/api/auth/me", {
					credentials: "include",
				});
				if (res.ok) {
					const data = await res.json();
					setUser(data);
					mergeAnonCart(data.id);
				}
			} catch (err) {
				if (process.env.NODE_ENV !== "production") {
					console.error(
						"AuthContext: failed to fetch current user:",
						err,
					);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const logout = async () => {
		await fetch("/api/auth/logout", {
			method: "POST",
			credentials: "include",
		});
		setUser(null);
		window.location.href = "/login";
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
