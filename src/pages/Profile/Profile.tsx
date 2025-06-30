import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
	const { nickname } = useParams();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
		>
			<h1>Добро пожаловать, {nickname}!</h1>
		</motion.div>
	);
};

export default Profile;