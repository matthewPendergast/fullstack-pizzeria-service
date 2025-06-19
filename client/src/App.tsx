import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/menu/MenuPage.tsx";
import Navbar from "./components/Navbar.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import CartPage from "./pages/cart/CartPage.tsx";
import "./App.css";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<MenuPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
		</>
	);
}

export default App;
