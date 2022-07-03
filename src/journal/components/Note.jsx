import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const Note = ({title, body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(setActiveNote({
            title,
            body,
            id,
            date,
            imageUrls
        }))
	}

    const newTitle = useMemo(()=>{
        return title.length > 17 
            ? title.substring(0, 17) + '...'
            : title
    }, [title])

    const newBody = useMemo(()=>{
        return body.length > 17 
            ? body.substring(0, 17) + '...'
            : body
    }, [body])

	return (
		<ListItem
			sx={{
				padding: 0,
			}}
            onClick={handleOnClick}
		>
			<ListItemButton
				sx={{
					paddingBlock: '15px',
				}}
			>
				<ListItemIcon>
					<TurnedInNotIcon />
				</ListItemIcon>
				<Grid container alignItems={'center'}>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={newBody} />
				</Grid>
			</ListItemButton>
		</ListItem>
	)
}
