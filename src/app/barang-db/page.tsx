import { getBarang } from "@/prisma-db";

type Barang = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export default async function BarangDB() {
    const barangs: Barang[] = await getBarang();

    return (
        <div className="flex flex-col">
            {barangs.map((barang) => (
                <div key={barang.id} className="flex flex-col">
                    <h2>{barang.title}</h2>
                    <p>{barang.price}</p>
                    <br />
                    <p>Rp. {barang.description}</p>
                </div>
            ))}
        </div>
    )
}