import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {

	const [formState, setFormState] = useState(initialForm)
	const [formValidation, setFormValidation] = useState({})

	useEffect(()=>{
		createValidators()
	}, [formState])

	const isFormValid = useMemo(()=>{
		let isValid = true
		Object.keys(formValidation).forEach(key =>{
			if(formValidation[key] !== null){
				isValid = false
				return isValid
			}
		})
		return isValid
	}, [formValidation])

	const onInputChange = ({ target }) => {
		const { name, value } = target
		setFormState({
			...formState,
			[name]: value,
		})
	}

	const onResetForm = () => {
		setFormState(initialForm)
	}

	const createValidators = () => {
		const formCheckedValues = {}

		Object.keys(formValidations).forEach((key) => {
			const [validator, errorMessage] = formValidations[key]
			formCheckedValues[`${key}Valid`] = validator(formState[key]) ? null : errorMessage
		})

		setFormValidation(formCheckedValues)
	}

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid,
	}
}
