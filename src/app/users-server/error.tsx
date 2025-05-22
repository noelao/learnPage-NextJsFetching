"use client"

import { useEffect } from "react";

export default function ErrorPage({error}: {error: Error }){
    useEffect(() => {
        console.error(`${error}`);
    }, [error]);
    return (
        <div className="flex items-center">
            <h1>Error fetcing data</h1>
        </div>
    )
}