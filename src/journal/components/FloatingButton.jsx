import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const FloatingButton = () => {
	return (
		<>
			<IconButton
				size="large"
				sx={{
					color: 'white',
					backgroundColor: 'error.main',
					borderRadius: '50%',
					':hover': { backgroundColor: 'error.main', opacity: 0.8 },
					position: 'fixed',
					right: 50,
					bottom: 50,
				}}
			>
				<AddOutlined
					sx={{
						fontSize: 40,
					}}
				/>
			</IconButton>
		</>
	)
}
