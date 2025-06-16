import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
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
