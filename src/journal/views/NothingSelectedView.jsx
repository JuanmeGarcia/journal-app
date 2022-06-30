import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelected = () => {
	return (
		<Grid
			container
			spacing={0}
			direction={'column'}
			alignItems={'center'}
			justifyContent={'center'}
			sx={{
				minHeight: 'calc(100vh - 110px)',
				backgroundColor: 'primary.main',
				padding: 4,
                borderRadius: '10px'
			}}
		>
            <Grid 
                item
                xs={12}
            >
                <StarOutline 
                    sx={{
                        fontSize: 100,
                        color: 'white',
                    }}
                />
            </Grid> 

            <Grid 
                item
                xs={12}
            >
                <Typography variant="h4" color={'white'}>
                    Select an entry to see more details
                </Typography>
            </Grid> 
		</Grid>
	)
}
