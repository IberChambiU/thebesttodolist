import { keyStorage } from "../../provider/storage/keyStorage";
import { useStorage } from "./useStorage";


export const useCheckAuthenticated = () => {
	const { auth } = keyStorage();
	const { getStorage } = useStorage();
	const isAuth = getStorage(auth).auth === 'true' ? true : false;
	return isAuth
}
