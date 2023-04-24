"use client";

import { useUserContext } from "@/app/contexts/UserContext";

const Header = () => {
	const { logout } = useUserContext();

	return (
		<div className="w-screen h-20 flex justify-center items-center border-b-gray-100 border-b-2 text-gray-400">
			<header className="flex gap-4  justify-end  w-full px-8 items-center">
				<button
					className="hover:bg-gray-100 px-5 py-2 rounded-lg font-semibold "
					onClick={logout}
				>
					Logout
				</button>
			</header>
		</div>
	);
};

export default Header;
