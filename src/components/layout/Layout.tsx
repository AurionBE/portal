import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import { AnimatePresence } from 'framer-motion';

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const location = useLocation();
	const showNavbar = location.pathname !== '/login';

	return (
		<>
			<ParticleBackground />
			<AnimatePresence>
				{showNavbar && <Navbar />}
			</AnimatePresence>
			<main className="app-layout">
				{children}
			</main>
		</>
	);
};

export default Layout;