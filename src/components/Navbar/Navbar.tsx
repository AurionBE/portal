import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';
import styles from './Navbar.module.css';
import { useState } from 'react';
import ServerStatus, { type ServerStatusType } from '../ServerStatus/ServerStatus';

const statusTranslations: Record<ServerStatusType, string> = {
	online: 'Всё стабильно',
	offline: 'Сервер не работает',
	attacked: 'СЕРВЕР ПОД АТАКОЙ!',
	hard: 'У сервера высокие нагрузки'
};

const Navbar = () => {

	// TODO: Реализовать API запрос
	const [serverState] = useState({
		status: 'attacked' as ServerStatusType,
		online: 1337,
		maxOnline: 2000
	});

	const getNavbarClass = () => {
		switch (serverState.status) {
			case 'online':
				return `${styles.navbar} ${styles.online}`;
			case 'offline':
				return `${styles.navbar} ${styles.offline}`;
			case 'attacked':
				return `${styles.navbar} ${styles.attacked}`;
			case 'hard':
				return `${styles.navbar} ${styles.hard}`;
			default:
				return styles.navbar;
		}
	};


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
				<ServerStatus
					status={serverState.status}
					statusText={statusTranslations[serverState.status]}
					online={serverState.online}
					maxOnline={serverState.maxOnline}
				/>
			</div>
			<Link to="/login" className={styles.loginButton} aria-label="Авторизоваться">
				<FiLogIn />
				<span>Авторизоваться</span>
			</Link>
		</motion.nav>
	);
};

export default Navbar;