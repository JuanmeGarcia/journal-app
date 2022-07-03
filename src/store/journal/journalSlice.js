import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isSaving: false,
	messageSaved: '',
	notes: [],
	activeNote: null,
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

        },
        setNotes: (state, { payload }) => {
            state.notes = payload
        },
        setSaving: (state) => {

        },
        updateNote: (state, { payload }) => {

        },
        deleteNoteById: (state, { payload }) => {

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
    savingNewNote
} = journalSlice.actions
