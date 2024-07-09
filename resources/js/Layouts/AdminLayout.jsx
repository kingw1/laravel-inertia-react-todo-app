import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
    const { component } = usePage();
    const { auth } = usePage().props;

    return (
        <>
            <div>
                <Toaster />
            </div>
            <header className="bg-black py-8 text-white">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-2xl">Todo</h2>
                        <nav className="flex justify-between items-center grow ml-36">
                            <div className="flex gap-6 items-center justify-start">
                                <Link
                                    href="/dashboard"
                                    className={`${
                                        component == "Dashboard"
                                            ? "font-semibold text-indigo-500"
                                            : ""
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/todo"
                                    className={`${
                                        component == "Todo"
                                            ? "font-semibold text-indigo-500"
                                            : ""
                                    }`}
                                >
                                    Todo
                                </Link>
                            </div>
                            <div>{auth.user.name}</div>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="mt-10">
                <div className="container mx-auto">{children}</div>
            </main>
        </>
    );
}
