import {
	Box,
	Divider,
	Drawer,
	List,
	Toolbar,
	Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Note } from './'

export const Sidebar = ({ drawerWidth = 240 }) => {
	const { displayName } = useSelector(state => state.auth)
	const { notes } = useSelector(state => state.journal)

	const renderNotes = notes.map(note => (
		<Note 
			key={note.id} 
			{...note}
		/>
	))

	return (
		<>
			<Box
				component={'nav'}
				sx={{
					width: { sm: drawerWidth },
					flexShrink: { sm: 0 },
					margin: 0,
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

					<List>{renderNotes}</List>
				</Drawer>
			</Box>
		</>
	)
}
