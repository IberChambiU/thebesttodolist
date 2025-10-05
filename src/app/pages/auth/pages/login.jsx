import { useNavigate } from "react-router-dom";
import { keyStorage } from './../../../../provider/storage/keyStorage';
import { MetaTags } from './../../../helpers/MetaTags';
import { useStorage } from './../../../hooks/useStorage';


export const Login = ({ metaData }) => {
	const { auth } = keyStorage();
	const navigate = useNavigate();
	const { setStorage } = useStorage();
	const login = () => {
		setStorage(auth, { auth: "true" });
		navigate('/dashboard/users');
	}
	return (
		<>
			<MetaTags metaData={metaData} />
			<h1>
				LOGIN
			</h1>
			<hr />
			<button
				onClick={login}
			>
				sign in
			</button>
		</>
	)
}

export default Login;