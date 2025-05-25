import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <div className="flex flex-col">
        <Link href={"/users-client"}>Sini sini cliet</Link>
        <Link href={"/users-server"}>Sini sini server</Link>
        <Link href={"/posts-sequential"}>posts sequential</Link>
        <Link href={"/user-parallel/2"}>user parallel</Link>
        <Link href={"/barang-db"}>barang database</Link>
        <Link href={"/react-form"}>react form</Link>
        <Link href={"/barang-db-create"}>barang-db-create server</Link>
      </div>

    </div>
  );
}
