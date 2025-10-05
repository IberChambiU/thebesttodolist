import  secureLocalStorage  from  "react-secure-storage";

const ls = secureLocalStorage;
// const ls = localStorage;

export const useStorage = () => {
	
	const setStorage = (key:string,value:object):boolean => {
		try {
			ls.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	const getStorage = (key:string):object => {
		try {
			return JSON.parse(ls.getItem(key) as string || '{}');
		} catch (error) {
			console.log(error);
			return JSON.parse('{}');
		}
	}
	const removeStorage = (key:string):boolean => {
		try {
			ls.removeItem(key);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	const existStorage = (key:string):boolean => {
		try {
			return ls.getItem(key) !== null;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	const removeAllStorage = () => {
		try {
			ls.clear();
			return true
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	return {
		setStorage,
		getStorage,
		removeStorage,
		existStorage,
		removeAllStorage,
	}
}
