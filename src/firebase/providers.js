import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider)
		// const credentials = GoogleAuthProvider.credentialFromResult(result)
		const { displayName, email, photoURL, uid } = result.user
        console.log(`todo OK`);
		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		}
	} catch (error) {
        console.log(`todo Mal`);

		const errorMessage = error.message
		return {
			ok: false,
            errorMessage
		}
	}
}


export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
	try{

		const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
		const { uid, photoURL } = response.user

		await updateProfile(FirebaseAuth.currentUser, {
			displayName: displayName,
		})

		return {
			ok: true,
			uid,
			photoURL,
			displayName,
			email,
		}

	}catch(error){
		return {
			ok: false,
			errorMessage: 'This user already exists'
		}
	}
}

export const loginWithEmailPassword = async ({email, password}) => {
	try {
		const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)
		const { uid, photoURL, displayName } = response.user
		return {
			ok: true,
			uid,
			displayName,
			photoURL,
			email,
			password,
		}
	} catch (error) {
		return {
			ok: false,
			errorMessage: error.message
		}
	}
}

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut()
}