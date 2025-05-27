"use client";

import { hapusBarang } from "@/actions/products";
import Link from "next/link";
import { useOptimistic, useState, startTransition } from "react"; // Tambahkan useState dan startTransition

export type Barang = {
    id: number;
    title: string;
    price: number;
    description: string | null;
};

export const BarangDetail = ({barangs} : {barangs: Barang[]}) => {
    // State untuk melacak ID barang yang sedang dalam proses "edit" (secara visual)
    const [editingItemId, setEditingItemId] = useState<number | null>(null);

    // Menggunakan useOptimistic untuk mengelola state optimis penghapusan
    // fungsi dari useOptimistic akan mengupdate daftar barang secara optimis,  Fungsinya adalah untuk memperbarui state secara optimis.
    const [optimisticBarang, setOptimisticBarang] = useOptimistic(
        barangs.map(barang => ({ ...barang, isDeleting: false })), // Tambah properti isDeleting
        // titk tiga diatas ...barang menandakan, masukkan properti baru pada barang(isi dari barangs) jadi isinya ada id, title, price, description dan tambahan baru yaitu isDeleting
        (currentBarangs, {actionType, itemId}: {actionType: 'delete' | 'startEdit', itemId: number}) => {
            if (actionType === 'delete') {
                return currentBarangs.filter((barang) => barang.id !== itemId);
            }
            // Untuk 'startEdit', kita tidak mengubah daftar, hanya state lokal editingItemId
            return currentBarangs;
        }
    );

    const handleHapusBarang = async (barangId: number) => {
        // Gunakan startTransition untuk update non-urgent
        startTransition(() => {
            setOptimisticBarang({actionType: 'delete', itemId: barangId});
        });
        await hapusBarang(barangId);
        // Setelah menghapus, jika barang yang dihapus juga sedang 'diedit', reset editingItemId
        if (editingItemId === barangId) {
            setEditingItemId(null);
        }
    };

    const handleEditClick = (barangId: number) => {
        // Di sini kita hanya set state lokal untuk efek visual
        // Navigasi akan ditangani oleh Link
        setEditingItemId(barangId);
        // Jika Anda ingin menunda navigasi atau melakukan sesuatu sebelum navigasi,
        // Anda bisa menggunakan router.push() di sini dan event.preventDefault() pada Link
        // Namun, untuk sekadar efek visual, set state saja cukup.
    };

    return (
        <div className="flex flex-row p-12 gap-8 flex-wrap">
            {optimisticBarang.map((barang) => {
                const isBeingEdited = editingItemId === barang.id;
                const isBeingDeleted = barang.isDeleting; // Anda bisa gunakan ini jika ingin efek saat menghapus

                return (
                    <div
                        key={barang.id}
                        className={`flex flex-col min-w-[240px] max-w-[300px] transition-opacity duration-300 ${
                            isBeingEdited ? "opacity-50" : "opacity-100"
                        }`}
                    >
                        <h2>{barang.title}</h2>
                        <p>Rp {barang.price}</p>
                        <p>{barang.description}</p>
                        <div className="flex flex-row gap-2 mt-2"> {/* Beri sedikit margin atas */}
                            <Link
                                href={`/barang-db/${barang.id}`}
                                passHref // Penting untuk custom component / styling
                                legacyBehavior // Jika Link membungkus komponen selain <a> dasar atau jika ada onClick
                            >
                                <Link
                                    href={`/barang-db/${barang.id}`}
                                    onClick={() => handleEditClick(barang.id)}
                                    className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex-1 text-center ${
                                        isBeingEdited
                                            ? "pointer-events-none opacity-70" // Nonaktifkan klik dan ubah tampilan
                                            : ""
                                    }`}
                                    aria-disabled={isBeingEdited} // Untuk aksesibilitas
                                >
                                    Edit
                                </Link>
                            </Link>

                            <form action={() => handleHapusBarang(barang.id)}>
                                <button
                                    type="submit"
                                    className="bg-red-800 text-white p-2 rounded hover:bg-red-600 w-full sm:w-max cursor-pointer disabled:opacity-50" // Perbaiki w-max
                                    disabled={isBeingEdited || isBeingDeleted} // Nonaktifkan juga jika sedang diedit
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// original code

// "use client";

// import { hapusBarang } from "@/actions/products";
// import Link from "next/link";
// import { useOptimistic } from "react";

// export type Barang = {
//     id: number;
//     title: string;
//     price: number;
//     description: string | null;
// };

// export const BarangDetail = ({barangs} : {barangs: Barang[]}) => {
//     // Menggunakan useOptimistic untuk mengelola state optimis
//     const [optimisticBarang, setOptimisticBarang] = useOptimistic(barangs, (barangTerpilih, barangId) => {
//         return barangTerpilih.filter((barang) => barang.id !== barangId);
//     });

//     const hapusBarangById = async (barangId: number) => {
//         setOptimisticBarang(barangId);
//         await hapusBarang(barangId);
//         // Setelah menghapus, tidak perlu melakukan apa-apa karena useOptimistic sudah mengupdate state
//     }

//     return (
//         <div className="flex flex-row p-12 gap-8 flex-wrap">
//             {optimisticBarang.map((barang) => (
//                 <div key={barang.id} className="flex flex-col min-w-[240px] max-w-[300px]">
//                     <h2>{barang.title}</h2>
//                     <p>Rp {barang.price}</p>
//                     <p>{barang.description}</p>
//                     <div className="flex flex-row gap-1">

//                         <Link 
//                             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 flex-1" href={`/barang-db/${barang.id}`}
//                             >edit</Link>

//                     {/* Kenapa pakai bind()?
// Karena kamu ingin langsung menyisipkan barang.id sebagai parameter, tapi tanpa langsung memanggil fungsi (hapusBarang(barang.id), yang akan menjalankannya langsung saat rendering). bind() memberi versi tertunda dari fungsi itu. */}
//                         <form action={hapusBarangById.bind(null, barang.id)}>

//                         <button
//                             className="bg-red-800 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50 w-max cursor-pointer"
//                         >delete</button>
//                         </form>

//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }