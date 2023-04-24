"use client";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "../contexts/ProductsContext";
import AsideBar from "./components/AsideBar";
import Header from "./components/Header";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
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
