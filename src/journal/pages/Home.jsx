import { FloatingButton } from '../components'
import { JournalLayout } from '../layout/JournalLayout'
import { Note, NothingSelected } from '../views'
import { useSelector } from 'react-redux'

export const Home = () => {

	const { activeNote } = useSelector(state => state.journal)

	return (
		<JournalLayout>

			{
				!!activeNote 
					? <Note />
					: <NothingSelected />
			}

			<FloatingButton />
		</JournalLayout>
	)
}
