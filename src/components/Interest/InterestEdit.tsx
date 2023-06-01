import { Interest, ProfileExtended } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"
import eventBus from "@/lib/eventBus"

type props = { interest: Interest | null, profile: ProfileExtended, close: Function }

export default function InterestEdit({ interest, profile, close }: props) {
    const [name, setName] = useState(interest?.name || "")

    const router = useRouter()

    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            interest ? `${process.env.NEXT_PUBLIC_HOST}/api/interest/${interest.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/interest`,
            {
                body: JSON.stringify({
                    name: name,
                    profileId: profile?.id || null
                }),
                method: interest ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                if (response.ok) {
                    if (router.pathname === "/profiles/[id]") eventBus.dispatch("refreshData")
                    router.replace(router.asPath)
                    close()
                } else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                    <span>{interest ? `Update ${interest.name}` : 'Create Interest'}</span>
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
                            {interest ? 'Update' : 'Save'}
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
                        className="input input-bordered w-full text-white"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}