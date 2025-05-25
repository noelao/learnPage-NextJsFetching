"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBarang(){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/react-form/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, price, description }),
            });

            if (!response.ok) {
                throw new Error("Failed to create barang");
            }

            // redirect to barang-db page after successful creation
            router.push("/barang-db");
        } catch (error) {
            console.error("Error creating barang:", error);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className="flex p-16">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col">
                    Title
                    <input 
                        type="text" 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />
                </label>
                <label className="flex flex-col">
                    Price
                    <input 
                        type="number" 
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                </label>
                <label className="flex flex-col">
                    Description
                    <textarea 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </label>
                <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    <h3>create add</h3>
                </button>
            </form>
        </div>
    )

}