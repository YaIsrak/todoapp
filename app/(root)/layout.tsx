import Navbar from '@/components/shared/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';

const font = Poppins({
	subsets: ['latin'],
	weight: '400',
});

export const metadata: Metadata = {
	title: 'Todo app by Israk',
	description: '',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${cn(`min-h-screen bg-background font-sans antialiased`)} ${
					font.className
				}`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					<>
						<Navbar />
						<main>{children}</main>
						<Toaster />
					</>
				</ThemeProvider>
			</body>
		</html>
	);
}
