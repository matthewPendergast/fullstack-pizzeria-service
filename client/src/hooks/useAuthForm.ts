import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.ts";
import { mergeAnonCart } from "../utils/cart.ts";

export const useAuthForm = (endpoint: string) => {
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const { setUser } = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccessMessage("");
		setErrorMessage("");

		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
				credentials: "include",
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Request failed");

			setUser(data);
			mergeAnonCart(data.id);
			setSuccessMessage("Success!");
			setTimeout(() => navigate("/"), 1000);
		} catch (err: any) {
			setErrorMessage(err.message);
		}
	};

	return { handleChange, handleSubmit, successMessage, errorMessage };
};
