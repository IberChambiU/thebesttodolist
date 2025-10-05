import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router";

import { Error404 } from '../app/pages/error404';
import { Loading } from '../app/components/loading';

import { baseRedirectRouter } from './baseRedirect.routes';
import { authRouter } from './../app/pages/auth';
import { landingRouter } from '../app/pages/landing';
import { backofficeRouter } from '../app/pages/backoffice';
import { basePath } from '../provider/api/api';

const baseRoute = '/home';

const router = createBrowserRouter(
	[
		{
			errorElement: <Error404 />,
			children: [
				baseRedirectRouter(baseRoute),
				landingRouter(),
				authRouter(),
				backofficeRouter(),
			],
		}
	],
	{
		basename: basePath,
	},
)

export const Router = () => {
	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider
				router={router}
				fallbackElement={<Loading />}
			/>
		</Suspense>
	)
}
