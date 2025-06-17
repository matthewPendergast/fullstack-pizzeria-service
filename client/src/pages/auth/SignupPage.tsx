import { useAuthForm } from "../../hooks/useAuthForm.ts";

const SignupPage = () => {
	const { handleChange, handleSubmit, message } =
		useAuthForm("/api/auth/signup");

	return (
		<div className="mx-auto max-w-md p-4">
			<h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<input
					name="username"
					placeholder="Username"
					onChange={handleChange}
					required
				/>
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
				<button className="rounded bg-green-600 px-4 py-2 text-white">
					Sign Up
				</button>
			</form>
			{message && <p className="mt-2 text-red-500">{message}</p>}
		</div>
	);
};

export default SignupPage;
