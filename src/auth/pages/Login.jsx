import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import {
	startGoogleSignIn,
	startLoginWithEmailPassword,
} from '../../store/auth'
import { useForm } from '../../hooks'
import { useMemo } from 'react'

const formData = {
	email: '',
	password: '',
}

export const Login = () => {
	const dispatch = useDispatch()
	const { status, errorMessage } = useSelector(state => state.auth)

	const { email, password, onInputChange } = useForm(formData)

	const isAuthenticating = useMemo(() => status === 'checking', [status])

	const onSubmit = e => {
		e.preventDefault()
		if (!email || !password) return

		dispatch(startLoginWithEmailPassword({ email, password }))
	}

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn())
	}

	return (
		<AuthLayout title="Login">
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
							label="Email"
							type="email"
							placeholder="email@email.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
						></TextField>
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
						></TextField>
					</Grid>
					{
						errorMessage &&
							<Grid item xs={12}>
								<Alert 
									severity="error"
								>
									{errorMessage}
								</Alert>
							</Grid>
					}

					<Grid
						container
						spacing={2}
						sx={{
							mb: 2,
							mt: 1,
						}}
					>
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								disabled={isAuthenticating}
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Button
								variant="outlined"
								fullWidth
								sx={{
									display: 'flex',
									gap: 1,
								}}
								onClick={onGoogleSignIn}
								disabled={isAuthenticating}
							>
								<Google />
								Google
							</Button>
						</Grid>
					</Grid>

					<Grid container direction={'row'} justifyContent={'end'}>
						<Link
							color={'inherit'}
							to="/auth/register"
							component={RouterLink}
						>
							Create an account
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	)
}
