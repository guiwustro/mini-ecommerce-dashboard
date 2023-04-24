"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const AsideBar = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	return (
		<>
			<aside
				className={`h-[calc(100vh)] ${
					isOpenMenu ? "flex" : "hidden"
				} fixed lg:flex bg-sky-900 w-48 content-center border-b-2 top-0 text-gray-200`}
			>
				<nav className="text-start flex flex-col gap-4  w-full">
					<Link
						href="/dashboard"
						className="font-bold text-xl h-20 flex justify-center items-center"
					>
						E-commerce
					</Link>
					<Link
						href="/dashboard/products"
						className="hover:bg-sky-800 hover:text-gray-100 py-4"
					>
						<span className="ps-8">Produtos</span>
					</Link>
					<Link
						href="/dashboard/orders"
						className="hover:bg-sky-800 hover:text-gray-100 py-4"
					>
						<span className="ps-8">Pedidos</span>
					</Link>
				</nav>
			</aside>
			<button
				onClick={() => setIsOpenMenu((old) => !old)}
				className="lg:hidden absolute top-1/2 left-1"
			>
				<AiOutlineMenu size={25} color={"gray"} />
			</button>
		</>
	);
};

export default AsideBar;
