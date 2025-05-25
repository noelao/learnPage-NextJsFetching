import { addBarang } from "@/prisma-db";

export async function POST(request: Request) {
    const body = await request.json();
    const { title, price, description } = body;

    const barang = await addBarang(title, parseInt(price), description);
    return new Response(JSON.stringify(barang), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}