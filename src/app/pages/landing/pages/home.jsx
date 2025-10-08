import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
	Box,
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	Button,
	Paper,
	Chip,
	useTheme,
	alpha,
	Stack,
	Avatar,
	Divider
} from '@mui/material';
import {
	CheckCircle as CheckIcon,
	Assignment as TaskIcon,
	Speed as SpeedIcon,
	Security as SecurityIcon,
	Group as GroupIcon,
	Notifications as NotificationsIcon,
	Star as StarIcon,
	ArrowForward as ArrowForwardIcon,
	PlayArrow as PlayIcon
} from '@mui/icons-material';
import { MetaTags } from "../../../helpers/MetaTags"
import { UiButton } from './../../../components/ui/buttons/uiButton';
import './home.css';

export const Home = ({ metaData }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const didClick = () => {
		navigate('/auth/login');
	}

	const features = [
		{
			icon: <TaskIcon />,
			title: 'Gestión de Tareas',
			description: 'Organiza y prioriza tus tareas de manera eficiente con nuestra interfaz intuitiva.'
		},
		{
			icon: <SpeedIcon />,
			title: 'Rápido y Eficiente',
			description: 'Interfaz optimizada que te permite gestionar tu productividad sin complicaciones.'
		},
		{
			icon: <GroupIcon />,
			title: 'Colaboración',
			description: 'Trabaja en equipo y comparte listas de tareas con tus colegas y amigos.'
		},
		{
			icon: <SecurityIcon />,
			title: 'Seguro y Confiable',
			description: 'Tus datos están protegidos con los más altos estándares de seguridad.'
		}
	];

	const stats = [
		{ number: '10K+', label: 'Usuarios Activos' },
		{ number: '50K+', label: 'Tareas Completadas' },
		{ number: '99.9%', label: 'Uptime' },
		{ number: '4.9★', label: 'Calificación' }
	];

	return (
		<>
			<MetaTags metaData={metaData} />
			
			{/* Hero Section */}
			<Box
				className="hero-background"
				sx={{
					background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
					py: { xs: 8, md: 12 },
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				<Container maxWidth="lg">
					<Grid container spacing={4} alignItems="center">
						<Grid item xs={12} md={6}>
							<Stack spacing={3} className="hero-content">
								
								
								<Typography
									variant="h2"
									component="h1"
									sx={{
										fontWeight: 'bold',
										background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
										backgroundClip: 'text',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										fontSize: { xs: '2.5rem', md: '3.5rem' }
									}}
								>
									EL MEJOR TODO LIST
								</Typography>
								
								<Typography
									variant="h6"
									color="text.secondary"
									sx={{ fontSize: '1.2rem', lineHeight: 1.6 }}
								>
									Organiza tu vida, aumenta tu productividad y alcanza tus metas con nuestra 
									plataforma intuitiva de gestión de tareas.
								</Typography>
								
								<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
									<Button
										component={Link}
										to="/auth/login"
										variant="contained"
										size="large"
										endIcon={<PlayIcon />}
										sx={{
											py: 1.5,
											px: 4,
											borderRadius: 2,
											textTransform: 'none',
											fontSize: '1.1rem',
											fontWeight: 600,
											background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
											'&:hover': {
												transform: 'translateY(-2px)',
												boxShadow: theme.shadows[8]
											},
											transition: 'all 0.3s ease'
										}}
									>
										Comenzar Ahora
									</Button>
									
									<Button
										component={Link}
										to="/about"
										variant="outlined"
										size="large"
										endIcon={<ArrowForwardIcon />}
										sx={{
											py: 1.5,
											px: 4,
											borderRadius: 2,
											textTransform: 'none',
											fontSize: '1.1rem',
											fontWeight: 600,
											'&:hover': {
												backgroundColor: alpha(theme.palette.primary.main, 0.08),
												transform: 'translateY(-2px)'
											},
											transition: 'all 0.3s ease'
										}}
									>
										Saber Más
									</Button>
								</Stack>
							</Stack>
						</Grid>
						
						<Grid item xs={12} md={6}>
							<Box
								className="hero-demo"
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<Paper
									elevation={8}
									sx={{
										p: 4,
										borderRadius: 3,
										background: theme.palette.mode === 'dark' 
											? 'rgba(255, 255, 255, 0.05)' 
											: 'rgba(255, 255, 255, 0.95)',
										backdropFilter: 'blur(10px)',
										width: '100%',
										maxWidth: 400
									}}
								>
									<Stack spacing={3}>
										<Box sx={{ textAlign: 'center' }}>
											<Avatar
												className="demo-avatar"
												sx={{
													width: 80,
													height: 80,
													bgcolor: theme.palette.primary.main,
													mx: 'auto',
													mb: 2
												}}
											>
												<CheckIcon sx={{ fontSize: 40 }} />
											</Avatar>
											<Typography variant="h5" fontWeight="bold" gutterBottom>
												Demo Interactivo
											</Typography>
											<Typography color="text.secondary">
												Prueba todas las funcionalidades
											</Typography>
										</Box>
										
										<UiButton 
											variant='outlined' 
											name='Probar Demo' 
											onPress={didClick}
											sx={{ width: '100%' }}
										/>
									</Stack>
								</Paper>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Stats Section */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Grid container spacing={3}>
					{stats.map((stat, index) => (
						<Grid item xs={6} md={3} key={index}>
							<Paper
								elevation={2}
								sx={{
									p: 3,
									textAlign: 'center',
									borderRadius: 2,
									'&:hover': {
										transform: 'translateY(-4px)',
										boxShadow: theme.shadows[8]
									},
									transition: 'all 0.3s ease'
								}}
							>
								<Typography
									variant="h3"
									component="div"
									sx={{
										fontWeight: 'bold',
										background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
										backgroundClip: 'text',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										mb: 1
									}}
								>
									{stat.number}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{stat.label}
								</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* Features Section */}
			<Box sx={{ bgcolor: alpha(theme.palette.grey[100], 0.5), py: 8 }}>
				<Container maxWidth="lg">
					<Stack spacing={6}>
						<Box sx={{ textAlign: 'center' }}>
							<Typography
								variant="h3"
								component="h2"
								gutterBottom
								sx={{
									fontWeight: 'bold',
									background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
									backgroundClip: 'text',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent'
								}}
							>
								¿Por qué elegir nuestro TODO List?
							</Typography>
							<Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
								Descubre las características que hacen de nuestra aplicación 
								la herramienta perfecta para tu productividad.
							</Typography>
						</Box>
						
						<Grid container spacing={4}>
							{features.map((feature, index) => (
								<Grid item xs={12} md={6} key={index}>
									<Card
										elevation={2}
										sx={{
											height: '100%',
											borderRadius: 2,
											'&:hover': {
												transform: 'translateY(-4px)',
												boxShadow: theme.shadows[8]
											},
											transition: 'all 0.3s ease'
										}}
									>
										<CardContent sx={{ p: 3 }}>
											<Stack direction="row" spacing={3} alignItems="flex-start">
												<Avatar
													sx={{
														bgcolor: alpha(theme.palette.primary.main, 0.1),
														color: theme.palette.primary.main,
														width: 60,
														height: 60
													}}
												>
													{feature.icon}
												</Avatar>
												<Stack spacing={1} flex={1}>
													<Typography variant="h6" fontWeight="bold">
														{feature.title}
													</Typography>
													<Typography color="text.secondary">
														{feature.description}
													</Typography>
												</Stack>
											</Stack>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Stack>
				</Container>
			</Box>

			{/* CTA Section */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Paper
					elevation={4}
					sx={{
						p: 6,
						borderRadius: 3,
						textAlign: 'center',
						background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
						color: 'white'
					}}
				>
					<Stack spacing={3} alignItems="center">
						<Typography variant="h4" fontWeight="bold">
							¿Listo para ser más productivo?
						</Typography>
						<Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600 }}>
							Únete a miles de usuarios que ya han transformado su forma de trabajar 
							con nuestro TODO List inteligente.
						</Typography>
						<Button
							component={Link}
							to="/auth/login"
							variant="contained"
							size="large"
							endIcon={<ArrowForwardIcon />}
							sx={{
								py: 1.5,
								px: 4,
								borderRadius: 2,
								textTransform: 'none',
								fontSize: '1.1rem',
								fontWeight: 600,
								bgcolor: 'white',
								color: theme.palette.primary.main,
								'&:hover': {
									bgcolor: alpha(theme.palette.common.white, 0.9),
									transform: 'translateY(-2px)',
									boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
								},
								transition: 'all 0.3s ease'
							}}
						>
							Empezar Gratis
						</Button>
					</Stack>
				</Paper>
			</Container>
		</>
	)
}
