import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authMetaData } from './auth.metadata';

const Login = lazy(async () => await import('../pages/login'));
const { login } = authMetaData()

export const routes = [
	{
		path: '/auth',
		element: Navigate,
		toyes: true,
		to: '/auth'
	},
	{
		index: true,
		element: Login,
		toyes: false,
		metadata: login
	},
	{
		path: '*',
		element: Navigate,
		toyes: true,
		to: '/auth'
	}
]