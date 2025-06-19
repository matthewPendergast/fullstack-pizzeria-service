import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.ts";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="bg-black py-2 text-center text-xl text-white">
			{user && <p>Welcome, {user.username}</p>}
			<div className="flex justify-center gap-8 py-2 text-xl">
				<Link to="/">Menu</Link>
				<Link to="/cart">Cart</Link>
				{user ? (
					<>
						<Link onClick={logout} to="/logout">
							Logout
						</Link>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
