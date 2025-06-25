import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import MenuPage from "./pages/menu/MenuPage.tsx";
import Navbar from "./components/Navbar.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import CartPage from "./pages/cart/CartPage.tsx";
import OrderSuccessPage from "./pages/order/OrderSuccessPage.tsx";
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
				<Route
					path="/order-success"
					element={
						<ProtectedRoute>
							<OrderSuccessPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
