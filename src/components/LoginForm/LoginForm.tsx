import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './LoginForm.module.css';
import { FiLoader } from 'react-icons/fi';

const LoginForm = () => {
	const [nicknameInput, setNicknameInput] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError('');
		setIsLoading(true);

		if (!nicknameInput || !password) {
			setError('Пожалуйста, заполните все поля.');
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.post('/api/auth/login', {
				nickname: nicknameInput,
				password
			});

			const { token } = response.data;
			Cookies.set('authToken', token, { expires: 7, path: '/' });
			Cookies.set('nickname', nicknameInput, { expires: 7, path: '/' });

			navigate(`/profile/${nicknameInput}`);
			window.location.reload();


		} catch (err: any) {
			if (axios.isAxiosError(err) && err.response) {
				setError(err.response.data.detail || 'Произошла ошибка при авторизации.');
			} else {
				setError('Не удалось подключиться к серверу.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.formContainer}>
			<h2>Войти в аккаунт</h2>
			<form onSubmit={handleSubmit} noValidate>
				<div className={styles.inputGroup}>
					<input
						id="nickname"
						type="text"
						value={nicknameInput}
						onChange={(e) => setNicknameInput(e.target.value)}
						placeholder="Никнейм"
						disabled={isLoading}
						autoComplete="username"
					/>
				</div>
				<div className={styles.inputGroup}>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Пароль"
						disabled={isLoading}
						autoComplete="current-password"
					/>
				</div>
				{error && <p className={styles.errorText}>{error}</p>}
				<button type="submit" className={styles.submitButton} disabled={isLoading}>
					{isLoading ? <FiLoader className={styles.spinner} /> : 'Авторизоваться'}
				</button>
			</form>
		</div>
	);
};

export default LoginForm;