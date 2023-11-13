'use client';

import { DeleteTodo } from '@/lib/actions/todo.action';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';

export default function DeleteButton({ todoId }: { todoId: string }) {
	async function handleDelete() {
		// TODO: delete
		await DeleteTodo(todoId);
		console.log(todoId);
	}

	return (
		<Button className='bg-primary' size={'icon'} onClick={() => handleDelete()}>
			<Check />
		</Button>
	);
}
