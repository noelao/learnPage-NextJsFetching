import { getBarang } from "@/prisma-db";
import Link from "next/link";

export type Barang = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export default async function BarangDB() {
    const barangs: Barang[] = await getBarang();

    return (
        <div className="flex flex-col p-12 gap-8">
            {barangs.map((barang) => (
                <div key={barang.id} className="flex flex-col">
                    <h2>{barang.title}</h2>
                    <p>Rp {barang.price}</p>
                    <p>{barang.description}</p>
                    <Link 
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50" href={`/barang-db/${barang.id}`}>edit</Link>
                </div>
            ))}
        </div>
    )
}