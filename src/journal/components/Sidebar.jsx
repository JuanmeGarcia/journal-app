import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export const Sidebar = ({ drawerWidth = 240 }) => {

	const { displayName } =	useSelector(state => state.auth)


	return (
		<>
			<Box
				component={'nav'}
				sx={{
					width: { sm: drawerWidth },
					flexShrink: { sm: 0 },
					margin: 0
				}}
			>
				<Drawer
					variant="permanent"
					open={true}
					sx={{
						display: { xs: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: `${drawerWidth}px`,
						},
					}}
				>
					<Toolbar>
						<Typography variant="h6" noWrap component={'div'}>
							{displayName}
						</Typography>
					</Toolbar>
					<Divider />

                    <List
					>
                        {
                            ['Enero', 'Febreo', 'Marzo', 'Abril'].map(month=>(
                                <ListItem key={month}
									sx={{
										padding: 0,
									}}
								>
                                    <ListItemButton 
										primary={month} 
										sx={{
											paddingBlock: '15px'
										}}
									>
                                        <ListItemIcon>
                                            <TurnedInNot />
                                        </ListItemIcon>
                                        <Grid container>
                                            <ListItemText primary={month} />
                                            <ListItemText secondary={'loreorem lorem lorem lorem'} />

                                        </Grid>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
				</Drawer>
			</Box>
		</>
	)
}
