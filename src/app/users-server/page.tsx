
type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
}

export default async function UsersServer() {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const users: User[] = await res.json();

    return (
        <div className="container flex-col p-3">
            {users.map((user) => (
                <div key={user.id} className="user-card pb-3">
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Username: {user.username}</p>
                </div>
            ))}
        </div>
    )
}