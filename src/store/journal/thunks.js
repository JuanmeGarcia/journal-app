import { async } from '@firebase/util'
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { fileUpload, loadNotes } from '../../helpers'
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'

export const startNewNote = () => {
	return async (dispatch, getState) => {
		try {
            dispatch(savingNewNote())
			const { uid } = getState().auth

			const newNote = {
				title: '',
				body: '',
				date: new Date().getTime(),
			}

			const newDocument = doc(
				collection(FirebaseDB, `${uid}/journal/notes`)
			)
			await setDoc(newDocument, newNote)
            newNote.id = newDocument.id
            
            dispatch(addNewEmptyNote(newNote))
            dispatch(setActiveNote(newNote))

		} catch (error) {
			return {
				ok: false,
				errorMessage: error.message,
			}
		}

		// todo:
		// dispatch de la nueva nota
		// dispatch para activar la nota
	}
}


export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if(!uid) throw new Error(`El uid del usuario no existe`)

        const notes = await loadNotes( uid )

        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
	return async (dispatch, getState) => {

		try {
			dispatch(setSaving())

			const { uid } = getState().auth
			const { activeNote } = getState().journal
	
			const noteToFireStore = {...activeNote}
			delete noteToFireStore.id
			const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)

			await setDoc(docRef, noteToFireStore, {
				merge: true
			})

			dispatch(updateNote(activeNote))
		} catch (error) {
			return {
				ok: false,
				error
			}
		}

	}
}

export const startUploadingFiles = (files = []) => {
	return async (dispatch) => {

		try {
			dispatch(setSaving())
	
			const fileUploadPromises = []
	
			for(const file of files){
				fileUploadPromises.push(fileUpload(file))
			}
			const photosUrl = await Promise.all(fileUploadPromises)
			dispatch(setPhotosToActiveNote(photosUrl))
			
		} catch (error) {
			throw new Error(error.message)
		}
	}
}

export const startDeletingNote = () => {
	return async (dispatch, getState) => {

		try {
			const { uid } = getState().auth
			const { activeNote } = getState().journal
			console.log({uid, activeNote});
	
			const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
			await deleteDoc(docRef)

			dispatch(deleteNoteById(activeNote.id))
		} catch (error) {
			throw new Error(error.message)
		}

	}
}