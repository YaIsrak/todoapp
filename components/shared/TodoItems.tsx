import { fetchUserTodos } from '@/lib/actions/user.action';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import DeleteButton from './DeleteButton';

interface todo {
	_id: string;
	title: string;
	createAt: any;
}

export default async function TodoItems() {
	const result = await fetchUserTodos('yaserarafatisrak@gmail.com');
	return (
		<section className='my-10'>
			<div>
				{result.todos[0] ? (
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
						{result.todos.map((todo: todo) => (
							<Card key={todo._id} className='overflow-hidden'>
								<CardHeader>
									<CardTitle>{todo.title}</CardTitle>
									<CardDescription>{`${result.todos[0].createdAt.toLocaleString()}`}</CardDescription>
								</CardHeader>
								<CardContent>
									<DeleteButton todoId={todo._id} />
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<Card className='flex justify-center bg-primary/10 border-none'>
						<CardHeader className='text-center'>
							<CardTitle className='text-black/50 dark:text-white/50 '>
								No todo found
							</CardTitle>
							<CardDescription>Create new todo</CardDescription>
						</CardHeader>
					</Card>
				)}
			</div>
		</section>
	);
}
