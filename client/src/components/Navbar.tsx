import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="bg-black py-2 text-center text-xl text-white">
			{user && <p>Welcome, {user.username}</p>}
			<div className="flex justify-center gap-8 py-2 text-xl">
				<Link to="/">Menu</Link>
				{user ? (
					<>
						<Link to="/">Cart</Link>
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
