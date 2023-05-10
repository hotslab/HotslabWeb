import { Achievement, ProfileExtended } from "@prisma/client";
import { useState } from "react"

type props = { achievement: Achievement | null, profile: ProfileExtended, close: Function }

export default function LinkEdit({ achievement, profile, close }: props) {
    const [name, setName] = useState(achievement?.name || "")
    const [description, setDescription] = useState(achievement?.description || "")

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
                close()
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="w-full">
            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                <span className="text-lg">
                    {achievement ? `Update ${achievement.name}` : 'Create Achievement'}
                </span>
                <div className="flex justify-between items-start flex-wrap gap-10">
                    <button
                        className="btn btn-sm btn-error"
                        onClick={() => close()}
                    >
                        Back
                    </button>
                    <button
                        className="btn btn-sm btn-success"
                        onClick={() => saveOrUpdate()}
                    >
                        {achievement ? 'Update' : 'Save'}
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