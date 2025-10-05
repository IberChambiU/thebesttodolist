import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router/router'
import { Providers } from './app/context/providers';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Providers>
			<Router />
		</Providers>
	</React.StrictMode>,
)
