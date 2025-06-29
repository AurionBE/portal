import { motion } from 'framer-motion';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginGuide from '../../components/LoginGuide/LoginGuide';
import styles from './Login.module.css';

const Login = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className={styles.loginContainer}>
				<div className={styles.loginWrapper}>
					<LoginGuide />
					<LoginForm />
				</div>
			</div>
		</motion.div>
	);
}

export default Login;