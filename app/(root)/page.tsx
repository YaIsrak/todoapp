import CreateForm from '@/components/form/CreateForm';
import TodoItems from '@/components/shared/TodoItems';
import UserNotFound from '@/components/shared/UserNotFound';

export default function Home() {
	return (
		<section className='container px-2 sm:px-6 lg:px-12 mx-auto max-w-7xl py-6'>
			<CreateForm />
			<TodoItems />
			<UserNotFound />
		</section>
	);
}
