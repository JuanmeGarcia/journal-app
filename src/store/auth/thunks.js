import { async } from "@firebase/util"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { setActiveNote } from "../journal"
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = (email, password)=>{
    return async (dispatch)=>{

        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await singInWithGoogle()
        if(!result.ok)
            return dispatch(logout(result))

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({displayName, password, email}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const {ok, errorMessage, ...response} = await registerUserWithEmailPassword({displayName, password, email})

        if(!ok) 
            return dispatch(logout({errorMessage}))

        dispatch(login(response))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const {ok, errorMessage, ...response} = await loginWithEmailPassword({email, password})

        if(!ok)
            return dispatch(logout({errorMessage}))

        dispatch(login(response))
    }
}

export const startLogoutWithFirebase = () => {
    return async (dispatch) => {

        try {
            await logoutFirebase()
    
            dispatch(logout({errorMessage: null}))

            dispatch(setActiveNote(null))
            dispatch(clearNotesLogout())
        } catch (error) {
            return{
                ok: false,
                errorMessage: error.message
            }
        }
    }
}