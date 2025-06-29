import { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackgroundComponent = () => {
	const [init, setInit] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = async (container?: Container) => {
		console.log("Particles loaded", container);
		return Promise.resolve();
	};

	const options: ISourceOptions = useMemo(
		() => ({
			background: {
				color: {
					value: "transparent",
				},
			},
			fpsLimit: 60,
			interactivity: {
				events: {
					onHover: {
						enable: false,
						mode: "repulse",
					},
				},
				modes: {
					repulse: {
						distance: 100,
						duration: 0.4,
					},
				},
			},
			particles: {
				color: {
					value: ["#ff8c00", "#ffa500", "#ffd700"],
				},
				links: {
					enable: false,
				},
				move: {
					direction: "top",
					enable: true,
					outModes: {
						default: "out",
					},
					random: true,
					speed: 0.5,
					straight: false,
				},
				number: {
					density: {
						enable: true,
						area: 800,
					},
					value: 150,
				},
				opacity: {
					value: { min: 0.1, max: 0.6 },
					animation: {
						enable: true,
						speed: 1,
						sync: false
					}
				},
				shape: {
					type: "circle",
				},
				size: {
					value: { min: 1, max: 3 },
				},
			},
			detectRetina: true,
		}),
		[],
	);

	if (init) {
		return (
			<Particles
				id="tsparticles"
				particlesLoaded={particlesLoaded}
				options={options}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: -1
				}}
			/>
		);
	}

	return <></>;
};

export default memo(ParticleBackgroundComponent);