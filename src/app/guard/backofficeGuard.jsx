import { Navigate, useLocation } from "react-router-dom";
import { useCheckAuthenticated } from "../hooks/useCheckAuthenticated";

export const BackofficeGuard = ({ children }) => {
	let auth = useCheckAuthenticated();
	let location = useLocation();
	if (!auth) {
		return <Navigate to="/auth/login" state={{ from: location }} replace />;
	}
	return children;
}
