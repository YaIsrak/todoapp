'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// import { fetchUserTodos } from '@/lib/actions/user.action';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import DeleteButton from './DeleteButton';

interface todo {
	_id: string;
	title: string;
	createAt: any;
}

export default function TodoItems() {
	const [result, setResult] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();

	useEffect(() => {
		fetch(`/api/usertodo/${session?.user?.email}`)
			.then((res) => res.json())
			.then((data) => {
				setResult(data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, [session]);

	return (
		<section className='my-10'>
			{loading ? (
				// Loading Component
				<div className=' grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
					<Card className='overflow-hidden'>
						<CardHeader>
							<Skeleton className='h-4 w-[250px]' />
							<Skeleton className='h-4 w-[200px]' />
						</CardHeader>
					</Card>
					<Card className='overflow-hidden'>
						<CardHeader>
							<Skeleton className='h-4 w-[250px]' />
							<Skeleton className='h-4 w-[200px]' />
						</CardHeader>
					</Card>
					<Card className='overflow-hidden'>
						<CardHeader>
							<Skeleton className='h-4 w-[250px]' />
							<Skeleton className='h-4 w-[200px]' />
						</CardHeader>
					</Card>
				</div>
			) : (
				// Result Component
				<div>
					{result && result.todos[0] ? (
						// Result True
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
						// Result false meanwhile No todo
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
			)}
		</section>
	);
}
