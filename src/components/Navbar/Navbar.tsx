import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiLogIn, FiUser } from 'react-icons/fi';
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import ServerStatus, { type ServerStatusType } from '../ServerStatus/ServerStatus';
import { useAuth } from '../../hooks/useAuth';

type ServerStatusApi = {
	status: ServerStatusType;
	status_text: string;
	online: number;
	max_online: number;
	last_update: string;
};

const Navbar = () => {
	const [serverState, setServerState] = useState<ServerStatusApi>({
		status: 'offline',
		status_text: 'Загрузка...',
		online: 0,
		max_online: 0,
		last_update: ''
	});

	const { isAuthenticated, nickname: loggedInNickname } = useAuth();
	const location = useLocation();

	useEffect(() => {
		let ignore = false;
		const fetchStatus = async () => {
			try {
				const res = await fetch('/api/server/status');
				if (!res.ok) throw new Error('Ошибка запроса');
				const data = await res.json();
				if (!ignore) setServerState(data);
			} catch {
				if (!ignore) setServerState(prevState => ({
					...prevState,
					status: 'offline',
					status_text: 'Ошибка соединения',
				}));
			}
		};

		fetchStatus();
		const interval = setInterval(fetchStatus, 5000);

		return () => {
			ignore = true;
			clearInterval(interval);
		};
	}, []);

	const getNavbarClass = () => {
		switch (serverState.status) {
			case 'online': return `${styles.navbar} ${styles.online}`;
			case 'offline': return `${styles.navbar} ${styles.offline}`;
			case 'attacked': return `${styles.navbar} ${styles.attacked}`;
			case 'hard': return `${styles.navbar} ${styles.hard}`;
			default: return styles.navbar;
		}
	};

	// Кнопка показывается, если пользователь НЕ на своей странице профиля или ее подстраницах
	const shouldShowButton = !(isAuthenticated && loggedInNickname && location.pathname.startsWith(`/profile/${loggedInNickname}`));

	return (
		<motion.nav
			className={getNavbarClass()}
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -60, opacity: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<div className={styles.leftSection}>
				<Link to="/" className={styles.logo}>
					<span className={styles.mainLogoText}>AURION</span>
					<span className={styles.subLogoText}>Зал забвения</span>
				</Link>
				{/* Теперь статус не является ссылкой */}
				<div className={styles.statusContainer}>
					<ServerStatus
						status={serverState.status}
						statusText={serverState.status_text}
						online={serverState.online}
						maxOnline={serverState.max_online}
					/>
				</div>
			</div>

			<AnimatePresence>
				{shouldShowButton && (
					<motion.div
						key="auth-button"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						{isAuthenticated ? (
							<Link to={`/profile/${loggedInNickname}`} className={styles.loginButton} aria-label="Личный кабинет">
								<FiUser />
								<span>Личный кабинет</span>
							</Link>
						) : (
							<Link to="/login" className={styles.loginButton} aria-label="Авторизоваться">
								<FiLogIn />
								<span>Авторизоваться</span>
							</Link>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
};

export default Navbar;