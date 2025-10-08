
import {
	Box,
	CircularProgress,
	Typography,
	Stack,
	useTheme,
	alpha,
	Fade
} from '@mui/material';
import { Assignment as TaskIcon } from '@mui/icons-material';
import './loading.css';

export const Loading = ({ message = "Cargando...", size = "large" }) => {
	const theme = useTheme();

	const getSize = () => {
		switch (size) {
			case 'small': return 30;
			case 'medium': return 50;
			case 'large': return 70;
			default: return 50;
		}
	};

	return (
		<Fade in timeout={300}>
			<Box
				className="loading-overlay"
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: alpha(theme.palette.background.default, 0.8),
					backdropFilter: 'blur(8px)',
					zIndex: 9999,
				}}
			>
				<Box className="loading-waves" />
				<Box
					className={`loading-container ${theme.palette.mode === 'dark' ? 'loading-glass-dark' : 'loading-glass'}`}
					sx={{
						textAlign: 'center',
						p: 4,
						borderRadius: 3,
						background: theme.palette.mode === 'dark' 
							? 'rgba(255, 255, 255, 0.05)' 
							: 'rgba(255, 255, 255, 0.95)',
						backdropFilter: 'blur(20px)',
						border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
						boxShadow: theme.shadows[8],
						minWidth: 200,
					}}
				>
					<Stack spacing={3} alignItems="center">
						{/* Logo/Icono animado */}
						<Box
							sx={{
								position: 'relative',
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							{/* Círculo de progreso principal */}
							<CircularProgress
								size={getSize()}
								thickness={4}
								sx={{
									color: theme.palette.primary.main,
									animation: 'spin 1.5s linear infinite',
									'@keyframes spin': {
										'0%': {
											transform: 'rotate(0deg)',
										},
										'100%': {
											transform: 'rotate(360deg)',
										},
									},
								}}
							/>
							
							{/* Círculo de progreso secundario */}
							<CircularProgress
								size={getSize() - 10}
								thickness={2}
								sx={{
									color: alpha(theme.palette.primary.main, 0.3),
									position: 'absolute',
									animation: 'spin-reverse 2s linear infinite',
									'@keyframes spin-reverse': {
										'0%': {
											transform: 'rotate(360deg)',
										},
										'100%': {
											transform: 'rotate(0deg)',
										},
									},
								}}
							/>

							{/* Icono central */}
							<Box
								sx={{
									position: 'absolute',
									color: theme.palette.primary.main,
									animation: 'pulse 2s ease-in-out infinite',
									'@keyframes pulse': {
										'0%, 100%': {
											transform: 'scale(1)',
											opacity: 1,
										},
										'50%': {
											transform: 'scale(1.1)',
											opacity: 0.8,
										},
									},
								}}
							>
								<TaskIcon sx={{ fontSize: getSize() * 0.4 }} />
							</Box>
						</Box>

						{/* Texto de carga */}
						<Stack spacing={1} alignItems="center">
							<Typography
								variant="h6"
								className="loading-title"
								sx={{
									fontWeight: 600,
									background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
									backgroundClip: 'text',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}
							>
								TODO LIST
							</Typography>
							
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{
									animation: 'fade 1.5s ease-in-out infinite',
									'@keyframes fade': {
										'0%, 100%': { opacity: 0.7 },
										'50%': { opacity: 1 },
									},
								}}
							>
								{message}
							</Typography>
						</Stack>

						{/* Puntos de carga animados */}
						<Box sx={{ display: 'flex', gap: 1 }}>
							{[0, 1, 2].map((index) => (
								<Box
									key={index}
									sx={{
										width: 8,
										height: 8,
										borderRadius: '50%',
										backgroundColor: theme.palette.primary.main,
										animation: `bounce ${1.2}s ease-in-out ${index * 0.2}s infinite`,
										'@keyframes bounce': {
											'0%, 80%, 100%': {
												transform: 'scale(0.8)',
												opacity: 0.5,
											},
											'40%': {
												transform: 'scale(1)',
												opacity: 1,
											},
										},
									}}
								/>
							))}
						</Box>
					</Stack>
				</Box>
			</Box>
		</Fade>
	);
};
