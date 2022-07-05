import { Close } from '@mui/icons-material'
import {
	Box,
	Divider,
	Drawer,
	Grid,
	List,
	Toolbar,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWindowsSize } from '../../helpers'
import { toggleIsActive } from '../../store/journal'
import { Note } from './'

export const Sidebar = ({ drawerWidth = 240 }) => {
	const [windowSize, setWindowSize] = useState(getWindowsSize())

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowsSize())
		}

		window.addEventListener('resize', handleWindowResize)

		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	const { displayName } = useSelector(state => state.auth)
	const { notes, isActive } = useSelector(state => state.journal)
	const dispatch = useDispatch()

	const onToggleMenu = () => {
		dispatch(toggleIsActive())
	}

	const renderNotes = notes.map(note => <Note key={note.id} {...note} />)

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
					variant={
						windowSize.innerWidth < 600
							? 'temporary'
							: 'permanent'
					}
					open={isActive}
					sx={{
						display: { xs: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: `${drawerWidth}px`,
						},
					}}
				>
					<Toolbar>
						<Grid
							container
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Typography variant="h6" noWrap component={'div'}>
								{displayName}
							</Typography>
							<Close 
								onClick={onToggleMenu} 
								sx={{
									display: `${
										windowSize.innerWidth < 600
											? 'block'
											: 'none'
									}`
								}}
							/>
						</Grid>
					</Toolbar>
					<Divider />

					<List>{renderNotes}</List>
				</Drawer>
			</Box>
		</>
	)
}
