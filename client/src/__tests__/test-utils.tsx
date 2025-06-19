import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext.tsx";
import { MemoryRouter } from "react-router-dom";
import { act, render } from "@testing-library/react";

export const TestWrapper = ({ children }: { children: ReactNode }) => (
	<AuthProvider>
		<MemoryRouter>{children}</MemoryRouter>
	</AuthProvider>
);

export const renderWithWrapper = async (ui: React.ReactElement) => {
	await act(async () => {
		render(ui, { wrapper: TestWrapper });
	});
};
