import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/menu/MenuPage.tsx";
import Navbar from "./components/Navbar.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import "./App.css";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<MenuPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</>
	);
}

export default App;
