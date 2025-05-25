"use client";
import { useFormStatus } from "react-dom";

export const Submit = () => {
    const { pending } = useFormStatus();

    return(
        <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={pending}
        >
            <h3>create add</h3>
        </button>
    )
}