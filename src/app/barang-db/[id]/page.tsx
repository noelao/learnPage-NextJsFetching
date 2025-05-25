import { getBarangById } from "@/prisma-db";
import EditBarangForm from "./page-edit-form";
import { Barang } from "@/app/barang-db/page";
import { notFound } from "next/navigation";

// tidak bisa dikasih asynyc karena ada react useactionstate
export default async function EditBarang(
    {params}: 
    {params: Promise<{id: string}>}
) {

    const { id } = await params;
    const barang : Barang | null = await getBarangById(parseInt(id));

    if (!barang) {
        notFound();
    }

    return(
        <EditBarangForm barang={barang}/>
    )
}