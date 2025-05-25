"use client";

import { useActionState } from "react";
import { FormState, createBarang } from "@/actions/products";

// type Error = {
//     title?: string;
//     price?: string;
//     description?: string;
// }
// type FormState = {
//     errors?: Error;
// }

export default function CreateProduct() {
    const initialState: FormState = {
        errors: {}
    };

    const [state, formAction, isPending] = useActionState(
        createBarang, 
        initialState
    );

    return(
        <div className="flex p-16">
            <form action={formAction} className="flex flex-col gap-3">
                <label className="flex flex-col">
                    Title
                    <input 
                        type="text" 
                        placeholder="Enter title"
                        name="title"
                    />
                </label>
                {state.errors?.title && (
                    <span className="text-red-500">
                        {state.errors.title}
                    </span>
                )}
                <label className="flex flex-col">
                    Price
                    <input 
                        type="number" 
                        placeholder="Enter price"
                        name="price"
                    />
                </label>
                {state.errors?.price && (
                    <span className="text-red-500">
                        {state.errors.price}
                    </span>
                )}
                <label className="flex flex-col">
                    Description
                    <textarea 
                        placeholder="Enter description"
                        name="description"
                    />
                </label>
                {state.errors?.description && (
                    <span className="text-red-500">
                        {state.errors.description}
                    </span>
                )}
                <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={isPending}
                >
                    <h3>create add</h3>
                </button>
            </form>
        </div>
    )
}