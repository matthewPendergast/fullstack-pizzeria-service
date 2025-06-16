import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="flex justify-center gap-8 bg-black py-2 text-xl text-white">
			<Link to="/">Menu</Link>
			<Link to="/login">Login</Link>
			<Link to="/signup">Sign Up</Link>
		</nav>
	);
};

export default Navbar;
