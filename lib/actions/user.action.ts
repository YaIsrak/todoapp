'use server';

import Todo from '../models/todo.model';
import Author from '../models/user.model';
import { connectToMongoDB } from '../mongoose';

export async function fetchUsers(userEmail: string) {
	console.log('useremail', userEmail);
	try {
		connectToMongoDB();
		return await Author.findOne({ email: userEmail });
	} catch (error: any) {
		throw new Error(`Failed to fetch ${error.message}`);
	}
}

export async function fetchUserTodos(userEmail: string) {
	try {
		connectToMongoDB();
		const todos = await Author.findOne({ email: userEmail }).populate({
			path: 'todos',
			model: Todo,
		});

		return todos;
	} catch (error: any) {
		throw new Error(`Failed to fetch ${error.message}`);
	}
}
