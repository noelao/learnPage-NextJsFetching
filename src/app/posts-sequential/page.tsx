import { Suspense } from "react";
import { Author } from "./author";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export default async function PostSequentialIni(){
    // saat pakai vpn proxy on tidak bisa karena server dalam tidak mau memakai port/proxy yang sama dengan yang di set
    // vpn yang saya guanakan adalah sager net karena tidak ada wifi
    const response = await fetch("https://jsonplaceholder.typicode.com/posts",
        {next: { revalidate: 60 },}
    );

    const posts: Post[] = await response.json();
    const postDari = posts.filter((post) => post.id % 10 === 1);

    return (
        <div className="flex flex-row flex-wrap p-6 gap-5  w-full justify-center ">
            {postDari.map((post) => (
                <div key={post.id} className="flex flex-col gap-3 user-card p-6 bg-gray-600 rounded-2xl shadow-md text-white" style={{ minWidth: '40%', maxWidth: '48%' }}>
                    <h2>{post.title}</h2>
                    <p>body: {post.body}</p>
                    <Suspense
                        fallback={
                            <div>
                                <h3>Loading...</h3>
                            </div>
                        }
                    >
                        <Author userId={post.userId} />
                    </Suspense>
                </div>
            ))}
        </div>
    )
}

