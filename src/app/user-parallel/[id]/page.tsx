type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type Album = {
    userId: number;
    id: number;
    title: string;
}

async function getPosts(userId: number) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        { next: { revalidate: 60 }, }
    );
    return response.json();
}
async function getUserAlbums(userId: number) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
        { next: { revalidate: 60 }, }
    );
    return response.json();
}

export default async function UserProfile({params} : {params: Promise<{id: string}>}){

    const { id } = await params;

    const postsData = getPosts(Number(id));
    const albumsData = getUserAlbums(Number(id));

    const [posts, albums] = await Promise.all([postsData, albumsData]);

    return (
        <div className="flex p-6 flex-row w-full gap-4">
            <div className="flex flex-col flex-1" style={{ minWidth: '40%', maxWidth: '48%' }}>
                {posts.map((post: Post) => (
                    <div key={post.id} className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col flex-1" style={{ minWidth: '40%', maxWidth: '48%' }}>
                {albums.map((album: Album) => (
                    <div key={album.id} className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-xl font-bold">{album.title}</h2>
                    </div>
                ))}
            </div>


        </div>
    )
}