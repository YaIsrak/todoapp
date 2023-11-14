'use client';
import { CreateTodo } from '@/lib/actions/todo.action';
import { fetchUsers } from '@/lib/actions/user.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title must be least 2 characters',
	}),
});

export default function CreateForm() {
	const route = useRouter();
	const { data, status } = useSession();
	const user: any = data?.user;
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	// On submit
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (user?.email) {
			const userinfo = await fetchUsers(user.email);

			await CreateTodo({
				title: values.title,
				author: userinfo._id,
			})
				.then(() => {
					toast({
						title: 'Todo Added',
						description: values.title,
					});
				})
				.catch(() => {
					toast({
						variant: 'destructive',
						title: 'Uh oh! Something went wrong.',
						description: 'There was a problem with your request.',
					});
				});
			route.refresh();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-3 justify-center'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input placeholder='Create a todo...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={!data && true}>
					Submit
				</Button>
			</form>
		</Form>
	);
}
