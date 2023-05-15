import { Achievement, ProfileExtended } from "@prisma/client";
import { useRouter } from "next/router";
import { use, useState } from "react"

type props = { achievement: Achievement | null, profile: ProfileExtended, close: Function }

export default function LinkEdit({ achievement, profile, close }: props) {
    const [name, setName] = useState(achievement?.name || "")
    const [description, setDescription] = useState(achievement?.description || "")

    const router = useRouter()

    async function saveOrUpdate() {
        await fetch(
            achievement ? `http://localhost:3000/api/achievement/${achievement.id}` : `http://localhost:3000/api/achievement`,
            {
                body: JSON.stringify({
                    name: name,
                    description: description,
                    profileId: profile?.id || null
                }),
                method: achievement ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else console.error(response.body)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                    <span>{achievement ? `Update ${achievement.name}` : 'Create Achievement'}</span>
                    <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
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
                            {achievement ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
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
                        <span className="label-text text-gray-600">Description</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="description"
                        className="textarea textarea-bordered"
                        cols={30}
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}