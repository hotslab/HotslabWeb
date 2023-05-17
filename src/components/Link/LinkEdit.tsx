import { Link, ProfileExtended } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"
import eventBus from "@/lib/eventBus"

type props = { link: Link | null, profile: ProfileExtended, close: Function }

export default function LinkEdit({ link, profile, close }: props) {
    const [name, setName] = useState(link?.name || "")
    const [url, setUrl] = useState(link?.url || "")

    const router = useRouter()

    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
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
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                    <span>{link ? `Update ${link.name}` : 'Create Link'}</span>
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
                            {link ? 'Update' : 'Save'}
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