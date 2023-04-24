import { UserProvider } from "./contexts/UserContext";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export const metadata = {
	title: "Mini Ecommerce Dashboard",
	description: "Dashboard for e-commerce",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
