import React from 'react'
import { MetaTags } from "../../../helpers/MetaTags"
import { UiButton } from './../../../components/ui/buttons/uiButton';

export const Home = ({ metaData }) => {

	const didClick = () => {
		console.log('click')
	}

	return (
		<>
			<MetaTags metaData={metaData} />
				<h4>Home</h4>
			<UiButton variant='outlined' name='click' onPress={didClick}/>
		</>
	)
}
