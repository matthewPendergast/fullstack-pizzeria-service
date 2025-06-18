import { useAuthForm } from "../../hooks/useAuthForm.ts";

const LoginPage = () => {
	const { handleChange, handleSubmit, successMessage, errorMessage } =
		useAuthForm("/api/auth/login");

	return (
		<div className="mx-auto max-w-md p-4">
			<h1 className="mb-4 text-2xl font-bold">Log In</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<input
					name="email"
					placeholder="Email"
					type="email"
					onChange={handleChange}
					required
				/>
				<input
					name="password"
					placeholder="Password"
					type="password"
					onChange={handleChange}
					required
				/>
				<button className="rounded bg-blue-600 px-4 py-2 text-white">
					Log In
				</button>
			</form>
			{successMessage && (
				<p className="mt-2 text-green-600">{successMessage}</p>
			)}
			{errorMessage && (
				<p className="mt-2 text-red-500">{errorMessage}</p>
			)}
		</div>
	);
};

export default LoginPage;
