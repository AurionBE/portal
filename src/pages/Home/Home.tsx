import { motion } from 'framer-motion';
import TypingAnimation from '../../components/TypingAnimation/TypingAnimation';
import styles from './Home.module.css';

const Home = () => {
	return (
		<motion.div
			className={styles.homeContainer}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className={styles.content}>
				<TypingAnimation />
			</div>
		</motion.div>
	);
};

export default Home;