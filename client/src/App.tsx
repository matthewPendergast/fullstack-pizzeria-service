import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<MenuPage />} />
		</Routes>
	);
}

export default App;
