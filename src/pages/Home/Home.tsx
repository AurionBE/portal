import { Link } from 'react-router-dom';

const homeStyles: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
	textAlign: 'center'
};

const linkStyles: React.CSSProperties = {
	marginTop: '20px',
	padding: '10px 20px',
	color: 'white',
	backgroundColor: 'var(--primary-orange)',
	textDecoration: 'none',
	borderRadius: '5px'
}

const Home = () => {
	return (
		<div style={homeStyles}>
			<h1>Главная страница портала "Aurion"</h1>
			<p>Эта страница находится в разработке.</p>
			<Link to="/login" style={linkStyles}>Перейти к авторизации</Link>
		</div>
	);
};

export default Home;