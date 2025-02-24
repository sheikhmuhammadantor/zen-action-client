import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

function AddTask() {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useAuth();

    const mutation = useMutation({
        mutationFn: async (newTask) => {
            return await axiosPublic.post("/tasks", newTask);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            toast.success("Task added successfully!");
        },
        onError: () => {
            toast.error("Failed to add task");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            timestamp:  new Date(Date.UTC(2025, 1, 21, 13, 0, 0)).toISOString().slice(0, 19) + "Z",
            category: 'To-Do',
            email: user.email,

        };

        mutation.mutate(newTask);
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-base-300 text-base-content p-6 rounded-xl shadow-lg max-w-md space-y-4 w-full mx-auto">
            <h2 className="text-2xl font-bold text-center">Add a New Task</h2>
            <input
                type="text"
                placeholder="Title"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full text-lg"
                required
            />
            <textarea
                placeholder="Description (optional)"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full text-lg"
            />
            <button type="submit" className="btn  w-full text-lg">Add Task</button>
        </form>
    );
}

export default AddTask;
