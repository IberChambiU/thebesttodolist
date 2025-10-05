import { Outlet, Link, useNavigate } from "react-router-dom";
import { useStorage } from "../../../hooks/useStorage";

export const BackofficeLayout = () => {
	const navigate = useNavigate();
	const { removeAllStorage } = useStorage();
	const logout = () => {
		removeAllStorage();
		navigate('/')
	}
	return (
		<>
			<div>BackofficeLayout</div>
			<nav>
				<ul>
					<li>
						<Link to={`/home`}>Home</Link>
					</li>
					<li>
						<Link to={`/dashboard/users`}>users</Link>
					</li>
					<li>
						<Link to={`/dashboard/tickets`}>tickets</Link>
					</li>
					<li>
						<button onClick={logout}>logout</button>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	)

}

export default BackofficeLayout;
