"use client";

import { Toaster } from "react-hot-toast";
import { FormLogin } from "./components/FormLogin";

export default function Home() {
	return (
		<main className="flex justify-center pt-32">
			<FormLogin />
			<Toaster />
		</main>
	);
}
