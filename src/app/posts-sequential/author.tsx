type Author = {
    id: number;
    name: string;
};

export async function Author({userId}: {userId: number}) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        next: { revalidate: 60 },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const user: Author = await response.json();

    return (
        <h3>{user.name}</h3>
    )
}