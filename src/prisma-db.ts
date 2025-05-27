import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

const sendBarang = async () => {
    const count = await prisma.barang.count();
    if(count === 0) {
        await prisma.barang.createMany({
            data: [
                { title: "Barang A", price: 1000, description: "Barang bekas" },
                { title: "Barang B", price: 2000, description: "Barang bekas" },
                { title: "Barang C", price: 3000, description: "Barang bekas" },
            ],
        });
    }
};

sendBarang();

export async function getBarang(query?: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (query) {
        const orConditions = [
            { title: { contains: query } },
            { description: { contains: query } },
        ];

        const numericQuery = parseInt(query);
        if (isNaN(numericQuery)) {
            return prisma.barang.findMany({
                where: {
                    OR: orConditions,
                },
            });
        } else {
            return prisma.barang.findMany({
                where: {
                    OR: [
                        { title: { contains: query } },
                        { description: { contains: query } },
                        { price: numericQuery },
                    ]
                },
            });
        }

    }

    return prisma.barang.findMany();

}

export async function getBarangById(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.barang.findUnique({
        where: { id },
    });
}

export async function addBarang(
    title: string,
    price: number,
    description: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.barang.create({
        data: {
            title,
            price,
            description,
        },
    });
}

export async function updateBarang(
    id: number,
    title: string,
    price: number,
    description: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.barang.update({
        where: { id },
        data: {
            title,
            price,
            description,
        },
    });
}

export async function deleteBarang(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.barang.delete({
        where: { id },
    });
}