import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
	Box,
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Container,
	Paper,
	InputAdornment,
	IconButton,
	Divider,
	useTheme,
	alpha,
	Chip
} from "@mui/material";
import {
	Login as LoginIcon,
	Visibility,
	VisibilityOff,
	Person as PersonIcon,
	Lock as LockIcon,
	ArrowForward as ArrowForwardIcon,
	Home as HomeIcon
} from "@mui/icons-material";
import { keyStorage } from './../../../../provider/storage/keyStorage';
import { MetaTags } from './../../../helpers/MetaTags';
import { useStorage } from './../../../hooks/useStorage';
import './login.css'


export const Login = ({ metaData }) => {
	const { auth } = keyStorage();
	const navigate = useNavigate();
	const { setStorage } = useStorage();
	const theme = useTheme();
	
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const login = async () => {
		setIsLoading(true);
		// Simulamos una pequeña carga para mejorar UX
		setTimeout(() => {
			setStorage(auth, { auth: "true" });
			navigate('/dashboard/users');
			setIsLoading(false);
		}, 1000);
	};

	return (
		<>
			<MetaTags metaData={metaData} />
			<Box
				className="login-background"
				sx={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
					py: 4
				}}
			>
				<Container maxWidth="sm" className="login-container">
					<Paper
						elevation={8}
						sx={{
							borderRadius: 3,
							overflow: 'hidden',
							background: theme.palette.mode === 'dark' 
								? 'rgba(255, 255, 255, 0.05)' 
								: 'rgba(255, 255, 255, 0.95)',
							backdropFilter: 'blur(10px)',
						}}
					>
						{/* Header Section */}
						<Box
							sx={{
								background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
								color: 'white',
								p: 4,
								textAlign: 'center'
							}}
						>
							<Box
								className="login-icon"
								sx={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: 80,
									height: 80,
									borderRadius: '50%',
									backgroundColor: 'rgba(255, 255, 255, 0.2)',
									mb: 2
								}}
							>
								<LoginIcon sx={{ fontSize: 40 }} />
							</Box>
							<Typography 
								variant="h4" 
								component="h1" 
								sx={{ 
									fontWeight: 'bold',
									letterSpacing: 1,
									mb: 1
								}}
							>
								TODO LIST
							</Typography>
							<Typography variant="body1" sx={{ opacity: 0.9 }}>
								Inicia sesión para acceder al sistema
							</Typography>
						</Box>

						{/* Form Section */}
						<CardContent sx={{ p: 4 }}>
							<Box component="form" sx={{ mt: 2 }}>
								<TextField
									fullWidth
									label="Usuario"
									name="username"
									value={formData.username}
									onChange={handleChange}
									variant="outlined"
									margin="normal"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon color="primary" />
											</InputAdornment>
										),
									}}
									sx={{
										'& .MuiOutlinedInput-root': {
											borderRadius: 2,
											'&:hover fieldset': {
												borderColor: theme.palette.primary.main,
											},
										},
									}}
								/>
								
								<TextField
									fullWidth
									label="Contraseña"
									name="password"
									type={showPassword ? 'text' : 'password'}
									value={formData.password}
									onChange={handleChange}
									variant="outlined"
									margin="normal"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<LockIcon color="primary" />
											</InputAdornment>
										),
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									}}
									sx={{
										'& .MuiOutlinedInput-root': {
											borderRadius: 2,
											'&:hover fieldset': {
												borderColor: theme.palette.primary.main,
											},
										},
									}}
								/>

								<Button
									fullWidth
									variant="contained"
									size="large"
									onClick={login}
									disabled={isLoading}
									endIcon={<ArrowForwardIcon />}
									className="login-button"
									sx={{
										mt: 3,
										mb: 2,
										py: 1.5,
										borderRadius: 2,
										textTransform: 'none',
										fontSize: '1.1rem',
										fontWeight: 600,
										background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
										'&:hover': {
											background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.dark, 0.8)} 100%)`,
											transform: 'translateY(-2px)',
											boxShadow: theme.shadows[8],
										},
										transition: 'all 0.3s ease',
									}}
								>
									{isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
								</Button>
							</Box>

							<Divider sx={{ my: 3 }}>
								<Typography variant="body2" color="text.secondary">
									Demo Login
								</Typography>
							</Divider>

							<Box sx={{ textAlign: 'center' }}>
								<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
									Usa cualquier credencial para acceder al sistema
								</Typography>
								
								{/* Enlace elegante al Home */}
								<Chip
									component={Link}
									to="/home"
									icon={<HomeIcon />}
									label="Volver al Inicio"
									clickable
									variant="outlined"
									className="home-chip"
									sx={{
										borderRadius: 3,
										py: 2,
										px: 1,
										fontSize: '0.9rem',
										fontWeight: 500,
										borderColor: theme.palette.primary.main,
										color: theme.palette.primary.main,
										'&:hover': {
											backgroundColor: alpha(theme.palette.primary.main, 0.08),
											borderColor: theme.palette.primary.dark,
											transform: 'translateY(-2px)',
											boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
										},
										'&:active': {
											transform: 'translateY(0px)',
										},
										transition: 'all 0.3s ease',
									}}
								/>
							</Box>
						</CardContent>
					</Paper>
				</Container>
			</Box>
		</>
	)
}

export default Login;