import { router } from "@inertiajs/react";
import React from "react";

function TodoModal({ todoProps, setShowConfirm }) {
    const handleDelete = (e) => {
        router.delete(`/todo/${todoProps.id}/delete`, {
            onSuccess: () => {
                setShowConfirm(false);
            },
        });
    };

    return (
        <section className="w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen">
            <div
                className="w-full fixed bg-black/70 left-0 top-0 h-screen"
                onClick={() => setShowConfirm(false)}
            ></div>
            <div className="w-[500px] bg-white relative rounded-md">
                <header className="border-b py-2 px-6">Confirmation</header>
                <div className="p-6">
                    <h3>Confirm to delete this data </h3>
                    <h4>
                        <strong>{todoProps.name}</strong>
                    </h4>
                    <div className="mt-6 flex gap-4 justify-end items-center">
                        <button
                            onClick={() => handleDelete()}
                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TodoModal;
