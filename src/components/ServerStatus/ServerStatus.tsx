import styles from './ServerStatus.module.css';

export type ServerStatusType = 'online' | 'offline' | 'attacked' | 'hard';

type ServerStatusProps = {
	status: ServerStatusType;
	statusText: string;
	online: number;
	maxOnline: number;
};

const ServerStatus = ({ status, statusText, online, maxOnline }: ServerStatusProps) => {
	const getStatusClass = () => {
		switch (status) {
			case 'online':
				return styles.online;
			case 'offline':
				return styles.offline;
			case 'attacked':
				return styles.attacked;
			case 'hard':
				return styles.hard;
			default:
				return '';
		}
	};

	return (
		<div className={`${styles.serverInfo} ${getStatusClass()}`}>
			<div className={styles.pulsatingDot}></div>
			<div className={styles.statusDetails}>
				<div className={styles.status}>
					{statusText}
				</div>
				<div className={styles.onlineCount}>
					<span>Игроков:</span> {online}/{maxOnline}
				</div>
			</div>
		</div>
	);
};

export default ServerStatus;