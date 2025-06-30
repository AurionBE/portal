import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUsers, FiShield, FiTrendingDown, FiGitMerge, FiTarget, FiCrosshair, FiAward, FiSlash, FiClock, FiLoader } from 'react-icons/fi';
import styles from './Profile.module.css';
import { SkinViewer, WalkingAnimation } from 'skinview3d';

interface Stats {
	kills: number;
	deaths: number;
	wins: number;
	losses: number;
}

interface CombatHistoryItem {
	id: number;
	mode: string;
	result: string;
	date: string;
}

interface ProfileData {
	nickname: string;
	title: string;
	rank_id: string;
	rank_name: string;
	rank_stars: number;
	stats_ffa: Stats;
	stats_duels: Stats;
	skin_base64: string | null;
	combat_history: CombatHistoryItem[];
}

const SkinViewerComponent = ({ skinBase64 }: { skinBase64: string | null }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current || !skinBase64) return;

		const skinViewer = new SkinViewer({
			canvas: canvasRef.current,
			width: 300,
			height: 400,
			skin: `data:image/png;base64,${skinBase64}`
		});

		skinViewer.animation = new WalkingAnimation();
		skinViewer.controls.enableZoom = false;

		return () => {
			skinViewer.dispose();
		}
	}, [skinBase64]);


	if (!skinBase64) {
		return <div className={styles.skinPlaceholder}>Скин не найден</div>;
	}

	return <canvas ref={canvasRef} className={styles.skinCanvas}></canvas>;
};


const Profile = () => {
	const { nickname } = useParams<{ nickname: string }>();
	const [profile, setProfile] = useState<ProfileData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchProfile = async () => {
			if (!nickname) return;
			try {
				setLoading(true);
				const response = await axios.get(`/api/profile/${nickname}`);
				setProfile(response.data);
			} catch (err: any) {
				if (axios.isAxiosError(err) && err.response) {
					setError(err.response.data.detail || 'Не удалось загрузить профиль.');
				} else {
					setError('Ошибка соединения с сервером.');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [nickname]);

	const formatModeName = (mode: string): string => {
		const parts = mode.split('_');
		const isRanked = parts.includes('rank');
		const mainParts = parts.filter(p => p !== 'rank');

		let name = mainParts.map(p => {
			if (p.toLowerCase() === 'ffa') return 'FFA';
			return p.charAt(0).toUpperCase() + p.slice(1);
		}).join(' ');

		if (isRanked) {
			name += " (Ранкед)";
		}

		return name;
	};

	const translateResult = (result: string): string => {
		if (result === 'victory') return 'Победа';
		if (result === 'defeat') return 'Поражение';
		if (result.startsWith('top_')) {
			const place = result.replace('top_', '');
			return `Топ-${place.replace('+', '')}${result.endsWith('+') ? '+' : ''}`;
		}
		return result.replace(/_/g, ' ');
	};

	const getResultClass = (result: string) => {
		if (result === 'victory' || result.startsWith('top_1')) return styles.victory;
		if (result === 'defeat') return styles.defeat;
		if (result.startsWith('top_')) {
			const top = parseInt(result.replace('top_', ''));
			if (top <= 5) return styles.top5
		}
		return styles.other;
	}

	if (loading) {
		return (
			<div className={styles.centerStatus}>
				<FiLoader className={styles.spinner} />
				<span>Загрузка профиля...</span>
			</div>
		);
	}

	if (error) {
		return <div className={styles.centerStatus}>{error}</div>;
	}

	if (!profile) {
		return null;
	}

	const rankIconUrl = `https://raw.githubusercontent.com/AurionBE/web-assets/refs/heads/main/rank_icons/${profile.rank_id}.png`;

	return (
		<motion.div
			className={styles.profileContainer}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<div className={styles.profileGrid}>

				<motion.div className={styles.leftColumn} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
					<div className={styles.playerCard}>
						<SkinViewerComponent skinBase64={profile.skin_base64} />
						<div className={styles.playerInfo}>
							<h1>{profile.nickname}</h1>
							<p>{profile.title}</p>
						</div>
					</div>
					<div className={styles.rankCard}>
						<img src={rankIconUrl} alt={profile.rank_name} className={styles.rankIcon} />
						<div className={styles.rankInfo}>
							<h2>{profile.rank_name}</h2>
							<div className={styles.rankStars}>
								<span>{profile.rank_stars} / {profile.rank_id === "entity_of_the_end" ? "∞" : 50} </span>
								<FiShield />
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div className={styles.rightColumn} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
					<div className={styles.statsContainer}>
						<div className={styles.statsBlock}>
							<h3 className={styles.statsHeader}><FiUsers /> FFA</h3>
							<div className={styles.statsGrid}>
								<div><FiCrosshair /><span>Убийства:</span> {profile.stats_ffa.kills}</div>
								<div><FiSlash /><span>Смерти:</span> {profile.stats_ffa.deaths}</div>
								<div><FiAward /><span>Победы:</span> {profile.stats_ffa.wins}</div>
								<div><FiTrendingDown /><span>Поражения:</span> {profile.stats_ffa.losses}</div>
							</div>
						</div>
						<div className={styles.statsBlock}>
							<h3 className={styles.statsHeader}><FiTarget /> DUELS</h3>
							<div className={styles.statsGrid}>
								<div><FiCrosshair /><span>Убийства:</span> {profile.stats_duels.kills}</div>
								<div><FiSlash /><span>Смерти:</span> {profile.stats_duels.deaths}</div>
								<div><FiAward /><span>Победы:</span> {profile.stats_duels.wins}</div>
								<div><FiTrendingDown /><span>Поражения:</span> {profile.stats_duels.losses}</div>
							</div>
						</div>
					</div>

					<div className={styles.historyContainer}>
						<h3><FiGitMerge /> История боев</h3>
						<div className={styles.historyList}>
							{profile.combat_history.map(item => (
								<div key={item.id} className={`${styles.historyItem} ${getResultClass(item.result)}`}>
									<span className={styles.mode}>{formatModeName(item.mode)}</span>
									<span className={styles.result}>{translateResult(item.result)}</span>
									<span className={styles.date}><FiClock /> {item.date}</span>
								</div>
							))}
						</div>
					</div>
				</motion.div>

			</div>
		</motion.div>
	);
};

export default Profile;