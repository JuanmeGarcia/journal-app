import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { loadNotes } from '../../helpers'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice'

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