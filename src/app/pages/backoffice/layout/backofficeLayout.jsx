import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
	AppBar, 
	Toolbar, 
	Typography, 
	Button, 
	Box, 
	Container,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	useTheme,
	useMediaQuery,
	Divider
} from "@mui/material";
import { 
	Menu as MenuIcon, 
	Home as HomeIcon,
	List as ListIcon,
	Logout as LogoutIcon
} from "@mui/icons-material";
import { useStorage } from "../../../hooks/useStorage";
import { UiTogleMode } from "../../../components/ui/buttons/uiTogleMode";
import './styles.css'

export const BackofficeLayout = () => {
	const navigate = useNavigate();
	const { removeAllStorage } = useStorage();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [mobileOpen, setMobileOpen] = useState(false);

	const logout = () => {
		removeAllStorage();
		navigate('/')
	}

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const menuItems = [
		{ text: 'Home', path: '/home', icon: <HomeIcon /> },
		{ text: 'Todo List', path: '/dashboard/users', icon: <ListIcon /> },
	];

	const drawer = (
		<Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
			<Box sx={{ p: 2 }}>
				<Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
					BACKOFFICE
				</Typography>
			</Box>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton component={Link} to={item.path}>
							<Box sx={{ mr: 2, color: 'primary.main' }}>
								{item.icon}
							</Box>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
				<ListItem disablePadding>
					<ListItemButton onClick={logout}>
						<Box sx={{ mr: 2, color: 'error.main' }}>
							<LogoutIcon />
						</Box>
						<ListItemText primary="Logout" />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
				<UiTogleMode />
			</Box>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<AppBar position="sticky" elevation={2}>
				<Container maxWidth="lg">
					<Toolbar>
						{isMobile && (
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								sx={{ mr: 2 }}
							>
								<MenuIcon />
							</IconButton>
						)}
						
						<Typography 
							variant="h6" 
							component="div" 
							sx={{ 
								flexGrow: 1, 
								fontWeight: 'bold',
								letterSpacing: 1
							}}
						>
							BACKOFFICE
						</Typography>

						{!isMobile && (
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								{menuItems.map((item) => (
									<Button
										key={item.text}
										component={NavLink}
										to={item.path}
										color="inherit"
										startIcon={item.icon}
										sx={{
											'&.active': {
												backgroundColor: 'rgba(255, 255, 255, 0.1)',
												borderRadius: 1,
											},
											'&:hover': {
												backgroundColor: 'rgba(255, 255, 255, 0.08)',
												borderRadius: 1,
											},
											textTransform: 'none',
											fontWeight: 500,
										}}
									>
										{item.text}
									</Button>
								))}
								<Button
									onClick={logout}
									color="inherit"
									startIcon={<LogoutIcon />}
									sx={{
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.08)',
											borderRadius: 1,
										},
										textTransform: 'none',
										fontWeight: 500,
										color: '#c70f21ff'
									}}
								>
									Logout
								</Button>
								<Box sx={{ ml: 2 }}>
									<UiTogleMode />
								</Box>
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>

			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
			>
				{drawer}
			</Drawer>

			<Container 
				maxWidth="lg" 
				component="main" 
				sx={{ 
					flexGrow: 1, 
					py: 3
				}}
			>
				<Outlet />
			</Container>
		</Box>
	)

}

export default BackofficeLayout;
