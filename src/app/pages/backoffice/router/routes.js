import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import { backofficeMetaData } from "./backoffice.metadata";

const { users, tickets } = backofficeMetaData()
const Users = lazy(async () => await import('../pages/users'));
const Tickets = lazy(async () => await import('../pages/tickets'));

export const routes = [
	{
		path: '/dashboard',
		element: Navigate,
		toyes: true,
		to: '/dashboard/users'
	},
	{
		path: 'users',
		metadata: users,
		element: Users,
		toyes: false
	},
	{
		path: 'tickets',
		metadata: tickets,
		element: Tickets,
		toyes: false
	},
	{
		path: '*',
		element: Navigate,
		toyes: true,
		to: '/dashboard/users'
	}
]