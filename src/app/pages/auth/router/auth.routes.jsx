import { Suspense, lazy } from "react";
import { Loading } from "../../../components/loading";
import { Error404 } from "../../error404";
import { AuthGuard } from './../../../guard/authGuard';
import { routes } from "./routes";

const AuthLayout = lazy(async () => await import('../layout/authLayout'));

export const authRouter = () => {

	const br = {
		path: '/',
		element:
			<AuthGuard>
				<AuthLayout />
			</AuthGuard>,
		errorElement:
			<Error404 />,
		children: [
			{
				path: '/auth',
				errorElement: <Error404 />,
				children: routes.map(({ path, element: Component, toyes, to, metadata, index }) =>
					Object.assign(
						index ? { index: true } : { path: path },
						{
							path: path,
							element: (
								<Suspense fallback={<Loading />}>
									{toyes ? (
										<Component to={to} />
									) : (
										<Component metaData={metadata} />
									)}
								</Suspense>
							),
							
						}
					)
				)
			}
		]

	}
	return br
}
