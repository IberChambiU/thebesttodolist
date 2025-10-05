import { Navigate, useLocation } from 'react-router-dom';
import { useCheckAuthenticated } from '../hooks/useCheckAuthenticated';

export const AuthGuard = ({ children }) => {
	let auth = useCheckAuthenticated();
	let location = useLocation();
	if (auth) {
		return <Navigate to="/dashboard" state={{ from: location }} replace />;
	}
	return children;
}
