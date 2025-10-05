import React from 'react'
import { LangProvider } from './langContext'
import { AppTheme } from '../../theme'


export const Providers = ({ children }) => {
	return (
		<AppTheme>
			<LangProvider>
				{children}
			</LangProvider>
		</AppTheme>
	)
}
