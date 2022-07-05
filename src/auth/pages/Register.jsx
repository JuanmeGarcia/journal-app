import { Grid, TextField, Button, Link, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formValidations = {
	email: [value => value.includes('@'), 'The email must contain an @'],
	password: [
		value => value.length > 5,
		'The password must be at least 6 characters',
	],
	displayName: [value => value.length > 2, 'The name is required'],
}

export const Register = () => {
	const [formSubmitted, setFormSubmitted] = useState(false)

	const dispatch = useDispatch()
	const { errorMessage, status } = useSelector(state => state.auth)
	const isCheckingAuthentication = useMemo(()=>{
		return status === 'checking'
	}, [status])

	const {
		email,
		password,
		displayName,
		onInputChange,
		formState,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
	} = useForm(
		{
			displayName: '',
			email: '',
			password: '',
		},
		formValidations
	)

	const onSubmit = e => {
		e.preventDefault()
		setFormSubmitted(true)

		if(!isFormValid) return

		dispatch(startCreatingUserWithEmailPassword(formState))
	}


	return (
		<AuthLayout title="Create account">
			<form onSubmit={onSubmit}>
				<Grid container gap={2}>
					<Grid
						item
						xs={12}
						sx={{
							mt: 2,
						}}
					>
						<TextField
							label="Full name"
							type="text"
							placeholder="John Doe"
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={formSubmitted && displayNameValid}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							label="Email"
							type="email"
							placeholder="email@email.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={formSubmitted && emailValid}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							label="Password"
							type="password"
							placeholder="password"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={formSubmitted && passwordValid}
						/>
					</Grid>

					<Grid
						container
						spacing={2}
						sx={{
							mb: 2,
							mt: 1,
						}}
					>	
					{
						formSubmitted && errorMessage &&
						<Grid item xs={12}>
							<Alert severity='error'>
								{errorMessage}
							</Alert>
						</Grid>
					}

						<Grid item xs={12}>
							<Button 
								variant="contained" 
								fullWidth 
								type="submit"
								disabled={isCheckingAuthentication}
							>
								Create account
							</Button>
						</Grid>
					</Grid>

					<Grid container direction={'row'} justifyContent={'end'}>
						<Link
							color={'inherit'}
							to="/auth/login"
							component={RouterLink}
						>
							Already have an account?
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	)
}
