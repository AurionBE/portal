import React from 'react';

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<main className="app-layout">
			{children}
		</main>
	);
};

export default Layout;