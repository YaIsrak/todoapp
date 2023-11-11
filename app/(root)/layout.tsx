import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import '../globals.css';

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
			<body className={cn('min-h-screen bg-background font-sans antialiased')}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					<>
						<Navbar />
						<main>
							<Sidebar />
							{children}
						</main>
					</>
				</ThemeProvider>
			</body>
		</html>
	);
}
