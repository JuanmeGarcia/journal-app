import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import { ImageGallery } from '../components'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'


export const Note = () => {
	const dispatch = useDispatch()
	const { activeNote, isSaving, messageSaved } = useSelector(state => state.journal)

	const {
		body, 
		title, 
		date,
		onInputChange, 
		formState
	} = useForm(activeNote)

	const fileInputRef = useRef(null)

	const dateString = useMemo(()=>{
		const newDate = new Date(date)
		return newDate.toUTCString()
	}, [date])

	useEffect(()=>{
		dispatch(setActiveNote(formState))
	}, [formState])

	useEffect(()=>{
		if(messageSaved.length > 0){
			Swal.fire(
				'Genial!',
				messageSaved,
				'success'
			)
		}
	}, [messageSaved])

	const onSaveNote = () => {
		dispatch(startSaveNote())
	}

	const onFileInputChange = (event) => {
		const { target } = event

		if(target.files <= 0) return
		dispatch(startUploadingFiles(target.files))

		console.log(`subiendo archivos`);
	}

	const onDelete = () => {
		dispatch(startDeletingNote())
	}

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
					{dateString}
				</Typography>
			</Grid>

			<Grid item>

				<input 
					type="file" 
					multiple
					onChange={onFileInputChange}
					style={{
						display: 'none'
					}}
					ref={fileInputRef}
				/>

				<IconButton 
					color='primary'
					disabled={isSaving}
					onClick={ () => fileInputRef.current.click() }
				>
					<UploadOutlined />
				</IconButton>

				<Button 
					color="primary" 
					sx={{ padding: 2 }}
					onClick={onSaveNote}
					disabled={isSaving}
				>
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
					name='title'
					value={title}
					onChange={onInputChange}
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
					name={'body'}
					value={body}
					onChange={onInputChange}
				/>
			</Grid>

			<Grid
				container
				justifyContent={'end'}
			>
				<Button
					onClick={onDelete}
					sx={{
						mt: 2
					}}
					color='error'
				>
					<DeleteOutline/>
					Delete
				</Button>
			</Grid>

            {/* todo: mostrar galeria de imagenes */}
            <ImageGallery
				images={activeNote.imageUrls}
			/>
		</Grid>
	)
}
