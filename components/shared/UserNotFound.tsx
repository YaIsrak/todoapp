'use client';
import { AlertTriangleIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function UserNotFound() {
	const { data } = useSession();

	if (!data?.user) {
		return (
			<Card className='flex justify-center bg-primary/10 border-none'>
				<CardHeader className='text-center'>
					<CardTitle className='text-black/50 dark:text-white/50 flex'>
						No User found! <AlertTriangleIcon />
					</CardTitle>
					<CardDescription>Create New User</CardDescription>
				</CardHeader>
			</Card>
		);
	}
}
