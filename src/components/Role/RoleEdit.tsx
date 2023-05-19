import eventBus from "@/lib/eventBus"
import { Role } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"

type props = {
    role: Role | null
    close: Function
}

export default function RoleEdit({ role, close }: props) {
    const [name, setName] = useState(role?.name || "")
    const [active, setActive] = useState(role?.active ? Boolean(role.active) : false)

    const router = useRouter()

    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            role ? `${process.env.NEXT_PUBLIC_HOST}/api/role/${role.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/role`,
            {
                body: JSON.stringify({ name: name }),
                method: role ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                    <span>{role ? `Update ${role.name}` : 'Create Role'}</span>
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
                            {role ? 'Update' : 'Save'}
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
                        <span className="label-text text-gray-600">Active</span>
                    </label>
                    <input
                        type="checkbox"
                        name="active"
                        className="toggle"
                        checked={Boolean(active)}
                        onChange={() => setActive(active ? false : true)}
                    />
                </div>
            </div>
        </div>
    )
}