import { Interest, ProfileExtended } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react"

type props = { interest: Interest | null, profile: ProfileExtended, close: Function }

export default function InterestEdit({ interest, profile, close }: props) {
    const [name, setName] = useState(interest?.name || "")

    const router = useRouter()

    async function saveOrUpdate() {
        await fetch(
            interest ? `http://localhost:3000/api/interest/${interest.id}` : `http://localhost:3000/api/interest`,
            {
                body: JSON.stringify({
                    name: name,
                    profileId: profile?.id || null
                }),
                method: interest ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else console.error(response.body)
            })
    }

    return (
        <div className="w-full">
            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                <span className="text-lg">
                    {interest ? `Update ${interest.name}` : 'Create Interest'}
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
                        {interest ? 'Update' : 'Save'}
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