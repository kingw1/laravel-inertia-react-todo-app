import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

function TodoEdit({ todo }) {
    const [processing, setProcessing] = useState(false);
    const { flash, errors } = usePage().props;
    const { data, setData, patch } = useForm({
        name: todo.name,
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        setProcessing(true);

        patch(`/todo/${todo.id}/edit`, data);
    };

    return (
        <>
            <Head title={`Todo edit ${todo.name}`} />
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-semibold text-4xl my-8 text-center">
                        Edit todo {todo.name}
                    </h2>
                    {flash.message && (
                        <div className="py-2 px-4 rounded-md bg-green-300 text-center mb-6">
                            {flash.message}
                        </div>
                    )}

                    <form onSubmit={handleUpdate}>
                        <div className="flex gap-4 items-center">
                            <input
                                type="text"
                                placeholder="Enter todo here..."
                                className="px-4 py-2 rounded-md grow"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                value={data.name}
                            />
                            <button className="py-2 px-4 rounded-md bg-indigo-500 text-white">
                                {processing ? "Updating...." : "Update"}
                            </button>
                        </div>
                        {errors.name && (
                            <p className="text-red-700 text-sm mt-2">
                                {errors.name}
                            </p>
                        )}
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}

export default TodoEdit;
