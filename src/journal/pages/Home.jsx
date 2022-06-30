import { FloatingButton } from '../components'
import { JournalLayout } from '../layout/JournalLayout'
import { Note, NothingSelected } from '../views'


export const Home = () => {
	return (
		<JournalLayout>
			{/* <Typography>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur cumque repudiandae eius consectetur, totam dolor perspiciatis, modi aliquid illo deserunt voluptatibus nam quia ipsam facere ullam impedit maiores minima. Id.
            </Typography> */}
			<NothingSelected />
			{/* <Note /> */}

			<FloatingButton />
		</JournalLayout>
	)
}
