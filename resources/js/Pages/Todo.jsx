import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import Pagination from "@/Components/Pagination";
import toast from "react-hot-toast";
import TodoModal from "@/Components/TodoModal";

function Todo({ todos }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [todoProps, setTodoProps] = useState({
        id: "",
        name: "",
    });
    const [processing, setProcessing] = useState(false);
    const { flash, errors } = usePage().props;
    const { data, setData, reset, post, patch } = useForm({
        name: "",
    });

    const storeTodo = (e) => {
        e.preventDefault();

        post("/todo", data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        flash.message && toast.success(flash.message);
    }, [flash]);

    const handleComplete = (id, name, is_complete) => {
        setProcessing(true);

        router.patch(
            `/todo/${id}/complete`,
            {
                is_complete: !is_complete,
            },
            {
                onSuccess: () => {
                    setProcessing(false);
                },
            }
        );
    };

    const handleConfirmation = (id, name) => {
        setShowConfirm(true);
        setTodoProps({
            id,
            name,
        });
    };

    return (
        <>
            <Head title="Todo" />
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-semibold text-4xl my-8 text-center">
                        Todo App
                    </h2>
                    <form onSubmit={storeTodo}>
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
                                Save
                            </button>
                        </div>
                        {errors.name && (
                            <p className="text-red-700 text-sm mt-2">
                                {errors.name}
                            </p>
                        )}
                    </form>
                    <div className="flex flex-col gap-4 mt-6">
                        {todos.data.map((todo, i) => {
                            return (
                                <div
                                    key={todo.id}
                                    className={`flex justify-between items-center py-3 px-6 ${
                                        todo.is_complete
                                            ? "bg-green-300"
                                            : "bg-slate-200"
                                    } rounded-md`}
                                >
                                    <h3>
                                        {processing
                                            ? "Processing..."
                                            : todo.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        {todo.is_complete ? (
                                            <FaRegCircleXmark
                                                className="cursor-pointer text-red-700"
                                                size={20}
                                                onClick={() =>
                                                    handleComplete(
                                                        todo.id,
                                                        todo.name,
                                                        todo.is_complete
                                                    )
                                                }
                                            />
                                        ) : (
                                            <FaRegCircleCheck
                                                className="cursor-pointer"
                                                size={20}
                                                onClick={() =>
                                                    handleComplete(
                                                        todo.id,
                                                        todo.name,
                                                        todo.is_complete
                                                    )
                                                }
                                            />
                                        )}

                                        <Link href={`/todo/${todo.id}/edit`}>
                                            <FiEdit size={20} />
                                        </Link>
                                        <FaRegTrashAlt
                                            size={20}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleConfirmation(
                                                    todo.id,
                                                    todo.name
                                                )
                                            }
                                        />
                                        {showConfirm && (
                                            <TodoModal
                                                todoProps={todoProps}
                                                setShowConfirm={setShowConfirm}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-8 flex justify-end items-center">
                        <Pagination links={todos.links} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

export default Todo;
