import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.ts";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();

	if (loading) return <p className="mt-4 text-center">Loading...</p>;

	if (!user) return <Navigate to="/login" replace />;

	return <>{children}</>;
};

export default ProtectedRoute;
