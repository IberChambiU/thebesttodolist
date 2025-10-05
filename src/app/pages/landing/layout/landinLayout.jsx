import { Outlet, Link, NavLink, useNavigation } from "react-router-dom";
import { UiTogleMode } from "../../../components/ui/buttons/uiTogleMode";
import './styles.css'

export const LandinLayout = () => {

	const navigation = useNavigation();

	return (
		<>
			<div>LandinLayout</div>
			<nav>
				<ul>
					<li>
						<UiTogleMode />
					</li>
					<li>
						<Link to={`/home`}>Home</Link>
					</li>
					<li>
						<Link to={`/contact`}>Contact</Link>
					</li>
					<li>
						<Link to={`/product/2`}>product 2</Link>
					</li>
					<li>
						<Link to={`/product/3`}>product 3</Link>
					</li>
					<li>
						<Link to={`/about`}>About</Link>
					</li>
					<li>
						<Link to={`/auth/login`}>login</Link>
					</li>
					<li>
						<Link to={`/dashboard`}>dashboard</Link>
					</li>
					<li>
						<Link to={`/dashboard/users`}>dashboard users</Link>
					</li>
					<li>
						<Link to={`/dashboard/tickets`}>dashboard tickets</Link>
					</li>
					<NavLink
						to={`/contact`}
						className={({ isActive, isPending }) =>
							isActive
								? "active"
								: isPending
									? "pending"
									: ""
						}
					>
						Contact
					</NavLink>
				</ul>
			</nav>
			<div
				id="detail"
				className={
					navigation.state === "loading" ? "loading" : ""
				}
			>
				<Outlet />
			</div>
		</>
	)
}
