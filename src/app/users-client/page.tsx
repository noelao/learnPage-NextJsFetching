"use client";

import { useState, useEffect } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
}

export default function UsersClient() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                if(err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

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