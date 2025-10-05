import { Helmet } from "react-helmet";

export const MetaTags = ({ metaData }) => {

	const { title, description = '', ogTitle = '', ogDescription = '', robot = '' } = metaData;
	console.log('metaData', metaData);
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="og:title" content={ogTitle} />
			<meta name="og:description" content={ogDescription} />
			<meta name="robots" content={robot} />
			<meta name="og:type" content="website" />
			{/* add your meta data here */}
		</Helmet>
	)
}
