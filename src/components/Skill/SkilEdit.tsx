import { Skill } from "@prisma/client";
import { useState } from "react"

type props = {
    skill: Skill | null
    close: Function
}

export default function LinkEdit({ skill, close }: props) {
    const [name, setName] = useState(skill?.name || "")

    async function saveOrUpdate() {
        await fetch(
            skill ? `http://localhost:3000/api/skill/${skill.id}` : `http://localhost:3000/api/skill`,
            {
                body: JSON.stringify({ name: name }),
                method: skill ? "PUT" : "POST",
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
                    {skill ? `Update ${skill.name}` : 'Create Skill'}
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
                        {skill ? 'Update' : 'Save'}
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