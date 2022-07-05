import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({children, title = ''}) => {
	return (
		<Grid
			container
			spacing={0}
			direction={'column'}
			alignItems={'center'}
			justifyContent={'center'}
			sx={{
				minHeight: '100vh',
				backgroundColor: 'primary.main',
				padding: 4,
			}}
		>
			<Grid
				container
				className="box-shadow animate__animated animate__fadeIn animate__fast"
				sx={{
					backgroundColor: 'white',
					padding: 3,
					borderRadius: 2,
                    width: {sm: 450, md: 650, lg: 800}
				}}
			>
				<Typography
					variant="h5"
					sx={{
						mb: 1,
					}}
				>
					{ title }
				</Typography>

                { children }
			</Grid>
		</Grid>
	)
}
