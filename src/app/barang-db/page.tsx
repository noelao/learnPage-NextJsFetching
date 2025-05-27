import { getBarang } from "@/prisma-db";
import { BarangDetail } from "./barang-detail";

export type Barang = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export default async function BarangDB({ searchParams }: 
    { searchParams: Promise<{queryIni?:string}> }
) {

    const { queryIni } = await searchParams;
    const barangs: Barang[] = await getBarang( queryIni );

    return (
        <BarangDetail barangs={barangs}/>
    )
}