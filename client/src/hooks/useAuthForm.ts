import { useState } from "react";

export const useAuthForm = (endpoint: string) => {
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [message, setMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");

		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
				credentials: "include",
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Request failed");

			setMessage("Success!");
		} catch (err: any) {
			setMessage(err.message);
		}
	};

	return { handleChange, handleSubmit, message };
};
