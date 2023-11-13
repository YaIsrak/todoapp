'use server';

import Todo from '../models/todo.model';
import Author from '../models/user.model';
import { connectToMongoDB } from '../mongoose';

interface Params {
	title: string;
	author: string;
}

export async function CreateTodo({ title, author }: Params) {
	try {
		connectToMongoDB();
		const createTodo = await Todo.create({ title, author });

		// update user model
		await Author.findByIdAndUpdate(author, {
			$push: {
				todos: createTodo._id,
			},
		});
	} catch (error: any) {
		throw new Error(`Failed to fetch User ${error.message}`);
	}
}

export async function DeleteTodo(todoId: string) {
	try {
		connectToMongoDB();
		await Todo.findByIdAndDelete(todoId);
	} catch (error: any) {
		throw new Error(`Failed to fetch User ${error.message}`);
	}
}
