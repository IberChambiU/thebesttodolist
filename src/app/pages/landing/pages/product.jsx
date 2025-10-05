import { useLoaderData } from "react-router-dom";
import { MetaTags } from "../../../helpers/MetaTags";

export const Product = ({ metaData }) => {
	const { params } = useLoaderData();
	console.log('params', params)

	return (
		<>
			<MetaTags metaData={metaData} />
			<br />
			<p>
				product
			</p>
		</>
	)
}

export default Product
