import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isSaving: false,
	messageSaved: '',
	notes: [],
	activeNote: null,
    isActive: false
}

export const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
		addNewEmptyNote: (state, { payload }) => {
            state.isSaving = false
            state.notes.push(payload)
        },
        setActiveNote: (state, { payload }) => {
            state.activeNote = payload
            state.messageSaved = ''
        },
        setNotes: (state, { payload }) => {
            state.notes = payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },
        updateNote: (state, { payload }) => {
            state.isSaving = false
            state.notes = state.notes.map(note => (
                note.id === payload.id
                    ? {...note,
                        body: payload.body,
                        title: payload.title
                    }
                    : note
            ))
            state.messageSaved = `Nota actualizada correctamente`
        },

        setPhotosToActiveNote: (state, action) => {
            console.log(action.payload)
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, action.payload].flat()
            state.isSaving = false
        },
        clearNotesLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
        },
        deleteNoteById: (state, { payload }) => {
            state.activeNote = null
            state.notes = state.notes.filter(note =>(
                note.id !== payload
            ))
        },
        toggleIsActive: (state) => {
            state.isActive = !state.isActive
        }
	},
})

export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    clearNotesLogout,
    setPhotosToActiveNote,
    toggleIsActive,
} = journalSlice.actions
