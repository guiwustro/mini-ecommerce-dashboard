"use client";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "../contexts/ProductsContext";
import AsideBar from "./components/AsideBar";
import Header from "./components/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<ProductProvider>
					<Header />
					<AsideBar />
					{children}
				</ProductProvider>
				<Toaster />
			</body>
		</html>
	);
}
