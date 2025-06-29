import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = () => {
	return (
		<motion.nav
			className={styles.navbar}
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -60, opacity: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<Link to="/" className={styles.logo}>
				<span className={styles.mainLogoText}>AURION</span>
				<span className={styles.subLogoText}>Зал забвения</span>
			</Link>
			<Link to="/login" className={styles.loginIcon} aria-label="Авторизоваться">
				<FiLogIn />
			</Link>
		</motion.nav>
	);
};

export default Navbar;