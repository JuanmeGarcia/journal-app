import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { Navbar, Sidebar } from '../components/'

const drawerWidth = 280

export const JournalLayout = ({ children }) => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
				}}
				className="animate__animated animate__fadeIn animate__fast"
			>
				<Navbar drawerWidth={drawerWidth} />
				<Sidebar drawerWidth={drawerWidth} />
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 2,
					}}
				>
                    <Toolbar />
					{children}
				</Box>
			</Box>
		</>
	)
}
