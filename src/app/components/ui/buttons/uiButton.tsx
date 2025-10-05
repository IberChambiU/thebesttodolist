import React from 'react'
import { Button } from "@mui/material"
import PropTypes from 'prop-types'

type btnVariatn = 'text' | 'outlined' | 'contained'

export const UiButton = ({name,type,variant,onPress}) => {
  return (
	<Button 
		variant={variant} 
		color={type}
		onClick={onPress}
	>
		{name}
	</Button>
  )
}

UiButton.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	variant: PropTypes.oneOf<btnVariatn>(['text', 'outlined', 'contained']),
	onPress: PropTypes.func,
}

UiButton.defaultProps = {
	name: 'Button',
	type: 'primaryButton',
	variant: 'outlined',
}

