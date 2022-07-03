import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'

export const FloatingButton = () => {
	const dispatch = useDispatch()
	const { isSaving } = useSelector(state => state.journal)

	const onClickNewNote = () => {
		dispatch(startNewNote())
	}
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
				onClick={onClickNewNote}
				disabled={isSaving}
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
