import LoginForm from '../../components/LoginForm/LoginForm';
import LoginGuide from '../../components/LoginGuide/LoginGuide';
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground';
import styles from './Login.module.css';

const Login = () => {
	return (
		<>
			<ParticleBackground />
			<div className={styles.loginContainer}>
				<div className={styles.loginWrapper}>
					<LoginGuide />
					<LoginForm />
				</div>
			</div>
		</>
	);
}

export default Login;