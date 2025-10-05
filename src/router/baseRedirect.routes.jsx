import { Navigate } from "react-router-dom"
import { Error404 } from "../app/pages/error404"
import PropTypes from 'prop-types'

export const baseRedirectRouter = (baseroute) => {

	const brr = {
		path: '',
		errorElement: <Error404 />,
		children: [
			{
				errorElement: <Error404 />,
				children: [
					{
						index: true,
						element: <Navigate exact to={baseroute} />,
					},
					{
						path: '*',
						element: <Navigate to={baseroute} />,
					}
				]
			}
		],
	}
	return brr
}

baseRedirectRouter.propTypes = {
	baseroute: PropTypes.string.isRequired,
}

baseRedirectRouter.defaultProps = {
	baseroute: '/',
}