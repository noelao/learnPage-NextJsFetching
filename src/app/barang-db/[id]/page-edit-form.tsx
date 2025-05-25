"use client";

import { useActionState } from "react";
import { FormState, editBarang } from "@/actions/products";
import { Barang } from "@/app/barang-db/page";
import { notFound } from "next/navigation";

export default function EditBarangForm(
    {barang}:
    {barang: Barang | null}
) {

    if (!barang) {
        notFound();
    }

    const editBarangWidthId = editBarang.bind(null, barang.id);

    const initialState: FormState = {
        errors: {}
    };
    const [state, formAction, isPending] = useActionState(
        editBarangWidthId, 
        initialState
    );

    return(
        <div className="flex p-16">
            <form action={formAction} className="flex flex-col gap-3">
                {/* <input type="text" hidden value={barang ? barang.id : ""} /> */}
                <label className="flex flex-col">
                    Title
                    <input 
                        type="text" 
                        placeholder="Enter title"
                        name="title"
                        defaultValue={barang ? barang.title : ""}
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
                        defaultValue={barang ? barang.price : ""}
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
                        defaultValue={barang ? barang.description ?? "" : ""}
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
                    <h3>create update</h3>
                </button>
            </form>
        </div>
    )
}