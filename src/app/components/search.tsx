import Form from "next/form"

export const Search = () => {
    return (
        <Form
            action="/barang-db"
        >
            <div className="flex items-center h-max">
                <input
                    type="text"
                    name="queryIni"
                    placeholder="Search..."
                    className="w-full h-full !px-4 !py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
        </Form>
    )
}