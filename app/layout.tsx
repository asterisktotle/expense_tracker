import GlobalState from '@/components/context/GlobalContext';
import './globals.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<GlobalState>
				<body>{children}</body>
			</GlobalState>
		</html>
	);
}
