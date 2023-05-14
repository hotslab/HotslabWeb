import { Tag } from "@prisma/client";
import { useState } from "react"

type props = {
    tag: Tag | null
    close: Function
}

export default function TagEdit({ tag, close }: props) {
    const [name, setName] = useState(tag?.name || "")

    async function saveOrUpdate() {
        await fetch(
            tag ? `http://localhost:3000/api/tag/${tag.id}` : `http://localhost:3000/api/tag`,
            {
                body: JSON.stringify({ name: name }),
                method: tag ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                close()
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="w-full">
            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                <span className="text-lg">
                    {tag ? `Update ${tag.name}` : 'Create Tag'}
                </span>
                <div className="flex justify-between items-start flex-wrap gap-10">
                    <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => close()}
                    >
                        Back
                    </button>
                    <button
                        className="btn btn-sm btn-success text-white"
                        onClick={() => saveOrUpdate()}
                    >
                        {tag ? 'Update' : 'Save'}
                    </button>
                </div>
            </dt>
            <div className="">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        autoComplete="name"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}