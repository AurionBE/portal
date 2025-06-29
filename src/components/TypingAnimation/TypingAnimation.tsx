import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import styles from './TypingAnimation.module.css';

const texts = [
	"Наблюдение за статистикой",
	"Информация о других игроках",
	"Безопасность и контроль",
	"Доступ к историям боев",
	"Узнать состояние сервера",
];

const TypingAnimation = () => {
	const [index, setIndex] = useState(0);
	const [currentText, setCurrentText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const type = () => {
			const fullText = texts[index];
			if (isDeleting) {
				setCurrentText(prev => prev.substring(0, prev.length - 1));
			} else {
				setCurrentText(prev => fullText.substring(0, prev.length + 1));
			}

			if (!isDeleting && currentText === fullText) {
				setTimeout(() => setIsDeleting(true), 2000);
			} else if (isDeleting && currentText === '') {
				setIsDeleting(false);
				setIndex(prev => (prev + 1) % texts.length);
			}
		};

		const typingSpeed = isDeleting ? 30 : 50;
		const timeout = setTimeout(type, typingSpeed);
		return () => clearTimeout(timeout);
	}, [currentText, isDeleting, index]);

	return (
		<h1 className={styles.title}>
			Зал забвения это:
			<br />
			<span className={styles.animatedText}>{currentText}</span>
			<motion.span
				className={styles.cursor}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
			/>
		</h1>
	);
};

export default memo(TypingAnimation);