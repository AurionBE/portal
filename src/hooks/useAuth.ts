import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [nickname, setNickname] = useState<string | null>(null);

	useEffect(() => {
		const token = Cookies.get('authToken');
		const userNickname = Cookies.get('nickname');

		if (token && userNickname) {
			setIsAuthenticated(true);
			setNickname(userNickname);
		} else {
			setIsAuthenticated(false);
			setNickname(null);
		}
	}, []);

	return { isAuthenticated, nickname };
};