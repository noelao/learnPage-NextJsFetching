"use server";

import { redirect } from "next/navigation";
import { addBarang, updateBarang, deleteBarang } from "@/prisma-db";
import { revalidatePath } from "next/cache";

export type Error = {
    title?: string;
    price?: string;
    description?: string;
}
export type FormState = {
    errors?: Error;
}

export async function createBarang(prevState: FormState, formData: FormData){
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    const errors: Error = {};
    if (!title) {
        errors.title = "Title is required";
    }
    if (!price) {
        errors.price = "Price is required";
    }
    if (!description) {
        errors.description = "Description is required";
    }
    if( Object.keys(errors).length > 0) {
        return { errors };
    }

    await addBarang(title, parseInt(price), description)
    redirect("/barang-db");
}

export async function editBarang(id:number, prevState: FormState, formData: FormData){
    // const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    const errors: Error = {};
    if (!title) {
        errors.title = "Title is required";
    }
    if (!price) {
        errors.price = "Price is required";
    }
    if (!description) {
        errors.description = "Description is required";
    }
    if( Object.keys(errors).length > 0) {
        return { errors };
    }

    await updateBarang(id ,title, parseInt(price), description)
    redirect("/barang-db");
}

export async function hapusBarang(id:number) {
    await deleteBarang(id);
    revalidatePath("/barang-db");
}
