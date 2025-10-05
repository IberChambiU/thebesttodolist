import { Suspense, lazy } from "react";
import { Error404 } from "../../error404";
import { Loading } from "../../../components/loading";
import { BackofficeGuard } from './../../../guard/backofficeGuard';
import { routes } from "./routes";

const BackofficeLayout = lazy(async () => await import('../layout/backofficeLayout'));

export const backofficeRouter = () => {

	const br = {
		path: '/',
		element:
			<BackofficeGuard>
				<BackofficeLayout />
			</BackofficeGuard>,
		errorElement:
			<Error404 />,
		children: [
			{
				path: '/dashboard',
				errorElement: <Error404 />,
				children: routes.map(({ path, metadata, element: Component, toyes, to }) =>
					Object.assign(
						path ? { path: path } : { index: true },
						{
							element: (
								<Suspense fallback={<Loading />}>
									{toyes ? (
										<Component to={to} />
									) : (
										<Component metaData={metadata} />
									)}
								</Suspense>
							)
						}
					)
				)
			}
		]

	}
	return br
}
