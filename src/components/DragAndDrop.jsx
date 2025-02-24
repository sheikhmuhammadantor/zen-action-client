import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from 'sweetalert2';
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import AddTask from "./task/AddTask";

function DragAndDrop() {
    const dragItem = useRef();
    const dragContainer = useRef();
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState({});
    const { logOut, loading, user } = useAuth();
    const navigate = useNavigate();
    const [dataLoading, setDataLoading] = useState(true);


    // eslint-disable-next-line no-unused-vars
    const { data: response = [], refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const { data } = await axiosPublic(`/tasks/${user.email}`);
            setData(data);
            setDataLoading(false);

            return data;
        },
    });

    const handleDragStart = (e, item, container) => {
        dragItem.current = item;
        dragContainer.current = container;
        e.target.style.opacity = "0.5";
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = "1";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handelLogout = () => {
        logOut()
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate('/login')
    }

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Confirm Delete",
            text: "Are you sure you want to Delete This Task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm Delete",
        });

        if (confirm.isConfirmed) {
            try {
                const deletedTask = await axiosPublic.delete(`/tasks-delete/${id}`);
                console.log(deletedTask);
                refetch();
                Swal.fire("Success", "Delete The Task!", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to confirm Delete.", "error");
                console.error("Error Delete Task:", error);
            }
        }
    };

    const handleEdit = async (item) => {
        document.getElementById(item._id).showModal();
    };

    const handelSubmit = async (e, id) => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;

        document.getElementById(id).close();

        try {
            const editedTask = await axiosPublic.put(`/task-update/${id}`, { title, description, category });
            console.log(editedTask);
            refetch();
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleDrop = async (e, targetContainer) => {
        const item = dragItem.current;
        try {
            await axiosPublic.put(`/tasks/${item._id}`, { category: targetContainer });
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <LoadingSpinner />

    return (
        <section className="container mx-auto px-4">
            <h1 className="text-center text-4xl font-bold my-4 flex justify-center items-center">ZenAction <span><button onClick={handelLogout} className="btn ml-6">LogOut</button></span></h1>
            <div>
                <AddTask />
            </div>
            {
                dataLoading ? <LoadingSpinner /> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8 my-10">
                        {Object.keys(data)?.map((container, index) => {
                            return (
                                <div
                                    className="bg-base-200 min-h-64 min-w-3xs p-4 text-base-content rounded-box"
                                    key={index}
                                    onDrop={(e) => handleDrop(e, container)}
                                    onDragOver={handleDragOver}
                                >
                                    <h2 className="text-xl font-bold text-center my-4">{container}</h2>
                                    {data[container]?.map((item) => {
                                        return (
                                            <div
                                                className="bg-base-300 text-base-content p-4 mb-2 cursor-move"
                                                key={item._id}
                                                onDragStart={(e) => handleDragStart(e, item, container)}
                                                onDragEnd={handleDragEnd}
                                                draggable
                                            >
                                                <div>
                                                    <h3 className="font-bold">{item?.title}</h3>
                                                    <p className="text-xs">{item?.description}</p>
                                                </div>
                                                <div className="flex gap-2 justify-center items-center cursor-pointer mt-4">
                                                    <button onClick={() => handleEdit(item)} className="btn btn-sm">Edit</button>
                                                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm">Delete</button>
                                                    <div>
                                                        <dialog id={item._id} className="modal">
                                                            <div className="modal-box">
                                                                <form onSubmit={(e) => handelSubmit(e, item._id)} className=" space-y-1">
                                                                    <div className="form-control">
                                                                        <label className="label">Title : </label>
                                                                        <input
                                                                            name="title"
                                                                            type="text"
                                                                            defaultValue={item?.title}
                                                                            className="input input-bordered w-full"
                                                                        />
                                                                    </div>
                                                                    <div className="form-control">
                                                                        <label className="label">Deception : </label>
                                                                        <input
                                                                            name="description"
                                                                            type="text"
                                                                            defaultValue={item?.description}
                                                                            className="input input-bordered w-full"
                                                                        />
                                                                    </div>
                                                                    <div className="form-control w-full">
                                                                        <label className="label">Category</label>
                                                                        <select
                                                                            name="category"
                                                                            defaultValue={item.category}
                                                                            className="select select-bordered w-full"
                                                                        >
                                                                            <option value="To-Do">To-Do</option>
                                                                            <option value="Done">Done</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                        </select>
                                                                    </div>
                                                                    <button type="submit" className="btn">Save</button>
                                                                </form>
                                                            </div>
                                                        </dialog>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
            }
        </section>
    );
}

export default DragAndDrop;
