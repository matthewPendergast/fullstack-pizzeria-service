import { useLocation, Navigate } from "react-router-dom";

const OrderSuccessPage = () => {
	const location = useLocation();
	const orderId = location.state?.orderId;

	if (!orderId) return <Navigate to="/" />;

	return (
		<div className="mx-auto max-w-xl p-4 text-center">
			<h1 className="mb-4 text-2xl font-bold">Thank you!</h1>
			<p>Your order has been placed successfully.</p>
			<p className="mt-2 text-lg">
				Order ID: <strong>{orderId}</strong>
			</p>
		</div>
	);
};

export default OrderSuccessPage;
