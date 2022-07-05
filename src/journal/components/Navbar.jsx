import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startLogoutWithFirebase } from '../../store/auth'
import { toggleIsActive } from '../../store/journal'

export const Navbar = ({ drawerWidth }) => {

	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(startLogoutWithFirebase())
	}

	const onToggleMenu = () => {
		dispatch(toggleIsActive())
	}

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						edge="start"
						sx={{
							mr: 2,
							display: { sm: 'none' },
						}}
						onClick={onToggleMenu}
					>
						<MenuOutlined />
					</IconButton>

					<Grid 
                        container 
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography variant='h5' noWrap >
                            Journal App
                        </Typography>
                        <IconButton color='error' onClick={onLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
				</Toolbar>
			</AppBar>
		</>
	)
}
