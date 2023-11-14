'use client';

import { DeleteTodo } from '@/lib/actions/todo.action';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

export default function DeleteButton({ todoId }: { todoId: string }) {
	async function handleDelete() {
		await DeleteTodo(todoId)
			.then(() => {
				toast({
					title: 'Delete Successfull!',
				});
			})
			.catch(() => {
				toast({
					variant: 'destructive',
					title: 'There is an error',
				});
			});
	}

	return (
		<Button className='bg-primary' size={'icon'} onClick={() => handleDelete()}>
			<Check />
		</Button>
	);
}
