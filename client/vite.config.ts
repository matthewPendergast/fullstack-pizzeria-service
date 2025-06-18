import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const target =
	process.env.USE_DOCKER === "true"
		? "http://api:5000"
		: "http://localhost:5000";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		host: "0.0.0.0",
		port: 5173,
		proxy: {
			"/api": {
				target,
				changeOrigin: true,
			},
		},
	},
});
