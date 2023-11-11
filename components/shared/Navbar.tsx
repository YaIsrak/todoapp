'use client';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { LogInIcon, Moon, Sun } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Popover, PopoverContent } from '../ui/popover';

export default function Navbar() {
	const { data: session, status } = useSession();
	const { setTheme } = useTheme();

	return (
		<nav className='border-b'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-12'>
				<div className='flex justify-between h-16 items-center'>
					{/* left Side */}
					<Link href={'/'}>
						<h2 className='text-2xl sm:text-3xl font-bold'>Todo app</h2>
					</Link>

					{/* RightSide */}
					<div className='flex gap-4'>
						{/* Theme Changer */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant={'outline'} size={'icon'}>
									<Sun className='inline dark:hidden' />
									<Moon className='hidden dark:inline' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => setTheme('light')} className='gap-2'>
									<Sun />
									Light
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme('dark')} className='gap-2'>
									<Moon />
									Dark
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Avater */}
						<>
							{status === 'authenticated' ? (
								<Popover>
									<PopoverTrigger asChild>
										<Avatar>
											<AvatarImage
												src={session.user?.image || ''}
												alt={session.user?.name || ''}
											/>
										</Avatar>
									</PopoverTrigger>
									<PopoverContent className='w-auto'>
										<div className='grid grid-cols-1 gap-2'>
											<Button className='bg-primary'>Profile</Button>
											<Button variant='destructive' onClick={() => signOut()}>
												Logout
											</Button>
										</div>
									</PopoverContent>
								</Popover>
							) : (
								<div className=''>
									<Button variant='outline' className='gap-1' onClick={() => signIn()}>
										<span className='hidden sm:inline'>Login</span>
										<LogInIcon />
									</Button>
								</div>
							)}
						</>
					</div>
				</div>
			</div>
		</nav>
	);
}
