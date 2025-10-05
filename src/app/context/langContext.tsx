import React, { useState, createContext } from 'react';
import en from '../../lang/en-US.json';
import es from '../../lang/es-ES.json';
import { IntlProvider } from 'react-intl';
import { useStorage } from '../hooks/useStorage';
import { keyStorage } from '../../provider/storage/keyStorage';

type LangContextType = {
	establecerLenguaje: (lenguaje: string) => void;
};

const langContext = createContext<LangContextType | undefined>(undefined);

const lenguajes = [
	{ locale: 'es-ES', message: es },
	{ locale: 'en-US', message: en }
	//add your languages here
]

const LangProvider = ({ children }) => {

	const { setStorage, getStorage } = useStorage();
	const { lang } = keyStorage();

	let localePorDefecto: string = lenguajes[0].locale;
	let mensajesPorDefecto: {} = es;
	let { lang: lan = localePorDefecto }: any = getStorage(lang);
	if (lan) {
		lenguajes.map((l) => {
			if (l.locale === lan) {
				mensajesPorDefecto = l.message;
				localePorDefecto = lan;
			}
		})
	}

	const [mensajes, establecerMensajes] = useState(mensajesPorDefecto);
	const [locale, establecerLocale] = useState(localePorDefecto);

	const actions = (l = lenguajes) => {
		const setLanguage: {} = {};

		lenguajes.map((l) => {
			setLanguage[l.locale] = () => {
				establecerMensajes(l.message);
				establecerLocale(l.locale);
				setStorage(lang, { lang: l.locale });
			}
		})

		return setLanguage;
	}
	const establecerLenguaje = (lenguaje: string) => {
		if (lenguajes.find((l) => l.locale === lenguaje) === undefined) { lenguaje = localePorDefecto; }
		const setLanguage = actions()
		setLanguage[lenguaje]()
	}

	return (
		<langContext.Provider value={{ establecerLenguaje: establecerLenguaje }}>
			<IntlProvider locale={locale} messages={mensajes}>
				{children}
			</IntlProvider>
		</langContext.Provider>
	);
}

export { LangProvider, langContext };