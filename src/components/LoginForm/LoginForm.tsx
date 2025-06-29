import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setError('');

		if (!nickname || !password) {
			setError('Пожалуйста, заполните все поля.');
			return;
		}

		console.log('Попытка авторизации с данными:', { nickname, password });

		// TODO: Реализовать логику авторизации
		if (nickname === "Admin" && password === "password") {
			alert("Успешная авторизация!");
		} else {
			setError('Неверный никнейм или пароль.');
		}
	};

	return (
		<div className={styles.formContainer}>
			<h2>Войти в аккаунт</h2>
			<form onSubmit={handleSubmit} noValidate>
				<div className={styles.inputGroup}>
					<div className={styles.labelWrapper}>
						<label htmlFor="nickname">Никнейм</label>
						<div className={styles.tooltip}>
							<span className={styles.tooltipIcon}>?</span>
							<span className={styles.tooltipText}>
								Это ваш игровой никнейм на сервере.
							</span>
						</div>
					</div>
					<input
						id="nickname"
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						placeholder="Никнейм"
					/>
				</div>
				<div className={styles.inputGroup}>
					<div className={styles.labelWrapper}>
						<label htmlFor="password">Пароль</label>
						<div className={styles.tooltip}>
							<span className={styles.tooltipIcon}>?</span>
							<span className={styles.tooltipText}>
								Пароль, который вы ввели когда зарегистрировались на сервере.
							</span>
						</div>
					</div>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Пароль"
					/>
				</div>
				{error && <p className={styles.errorText}>{error}</p>}
				<button type="submit" className={styles.submitButton}>
					Авторизоваться
				</button>
			</form>
		</div>
	);
};

export default LoginForm;