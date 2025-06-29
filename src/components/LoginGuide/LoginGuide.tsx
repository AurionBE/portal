import styles from './LoginGuide.module.css';
import { FaDiscord, FaTelegramPlane, FaVk } from 'react-icons/fa';

const LoginGuide = () => {
	return (
		<div className={styles.guideContainer}>
			<h2>AURION - Зал забвения</h2>
			<h1>ВАШ АККАУНТ В ВАШИХ РУКАХ, ДАЖЕ ВНЕ ИГРЫ</h1>
			<p className={styles.description}>
				Управляйте своими сессиями, следите за своей статистикой, блокируйте
				неизвестные устройства, изменяйте данные, кастомизируйте свой
				профиль и так далее. Всё это в Зале забвения.
			</p>
			<div className={styles.footer}>
				<p className={styles.supportText}>
					Возникли проблемы? Обратитесь в поддержку.
				</p>

				{ /* TODO: Добавить ссылки на социальные сети */}
				<div className={styles.socialsContainer}>
					<a href="#" className={styles.socialButton} aria-label="VKontakte"><FaVk /></a>
					<a href="#" className={styles.socialButton} aria-label="Telegram"><FaTelegramPlane /></a>
					<a href="#" className={styles.socialButton} aria-label="Discord"><FaDiscord /></a>
				</div>
			</div>
		</div>
	);
}

export default LoginGuide;