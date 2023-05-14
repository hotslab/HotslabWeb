import { Link, ProfileExtended } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react"

type props = { link: Link | null, profile: ProfileExtended, close: Function }

export default function LinkEdit({ link, profile, close }: props) {
    const [name, setName] = useState(link?.name || "")
    const [url, setUrl] = useState(link?.url || "")

    const router = useRouter()

    async function saveOrUpdate() {
        await fetch(
            link ? `http://localhost:3000/api/link/${link.id}` : `http://localhost:3000/api/link`,
            {
                body: JSON.stringify({
                    name: name,
                    url: url,
                    profileId: profile?.id || null
                }),
                method: link ? "PUT" : "POST",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else console.error(response.body)
            })
    }

    return (
        <div className="w-full">
            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                <span className="text-lg">
                    {link ? `Update ${link.name}` : 'Create Link'}
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
                        {link ? 'Update' : 'Save'}
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
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Url</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        autoComplete="name"
                        className="input input-bordered w-full"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}