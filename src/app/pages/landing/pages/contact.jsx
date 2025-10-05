import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { MetaTags } from "../../../helpers/MetaTags";
import { langContext } from "../../../context/langContext";
import { useStorage } from "../../../hooks/useStorage";
import { keyStorage } from "../../../../provider/storage/keyStorage";

export const Contact = ({ metaData }) => {

	const idioma = useContext(langContext)
	const { setStorage } = useStorage();
	const { lang } = keyStorage();
	const navigate = useNavigate();

	const gotoindex = () => {
		navigate(-1)
	}

	const change = (lange) => {
		setStorage(lang, { lang: lange });
		idioma.establecerLenguaje(lange);
	}


	return (
		<>
			<MetaTags metaData={metaData} />


			<h1>
				<FormattedMessage
					id="contact"
					defaultMessage="Contact"
				/>
			</h1>


			<Link to={'/'}>
				<button>
					link
				</button>
			</Link>
			<button
				type="button"
				onClick={() => gotoindex()}
			>
				Cancel
			</button>
			<button
				type="button"
				onClick={() => change('en-US')}
			>
				en
			</button>
			<button
				type="button"
				onClick={() => change('es-ES')}
			>
				es
			</button>

		</>
	)
}

export default Contact