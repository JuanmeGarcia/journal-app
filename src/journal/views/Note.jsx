import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'

export const Note = () => {
	return (
		<Grid
			container
			direction="row"
			justifyContent={'space-between'}
			alignItems={'center'}
			sx={{ mb: 1 }}
			className="animate__animated animate__fadeIn animate__fast"
		>
			<Grid item>
				<Typography fontSize={40} fontWeight={'light'}>
					24 de Junio, 2022
				</Typography>
			</Grid>

			<Grid item>
				<Button color="primary" sx={{ padding: 2 }}>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type={'text'}
					variant={'filled'}
					fullWidth
					placeholder="Set a title"
					label="Title"
					sx={{
						border: 'none',
						mb: 1,
					}}
				/>

				<TextField
					type={'text'}
					variant={'filled'}
					fullWidth
					multiline
					placeholder="What happen today?"
					minRows={5}
				/>
			</Grid>

            {/* todo: mostrar galeria de imagenes */}
            <ImageGallery/>
		</Grid>
	)
}
