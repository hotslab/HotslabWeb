import { Link, ProfileExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import LinkEdit from "@/components/Link/LinkEdit"
import { useState } from "react"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import Modal from "@/components/Modal"

type props = { links: Link[], profile: ProfileExtended, close?: Function }

export default function Links({ links, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedLink, setSelectedLink] = useState<Link | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

    const router = useRouter()

    function openEdit(link: Link | null) {
        setSelectedLink(link)
        setShowEdit(true)
    }
    function openOrCloseDelete(link: Link | null = null) {
        setSelectedLink(link)
        setShowConfirmModal(link ? true : false)
    }
    async function deleteItem() {
        if (selectedLink) {
            eventBus.dispatch("openLoadingPage", true)
            await fetch(
                `http://localhost:3000/api/link/${selectedLink.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                    },
                }).then(async response => {
                    if (response.ok) router.replace(router.asPath)
                    else eventBus.dispatch("openErrorModal", (await response.json()).data)
                    openOrCloseDelete()
                    eventBus.dispatch("openLoadingPage", false)
                })
        } else eventBus.dispatch("openErrorModal", "Link selected for deletion is missing")
    }
    function closeEdit() {
        setSelectedLink(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                <span>Links</span>
                                <span>{links.length}</span>
                            </div>
                            <div className="mt-2 flex justify-start sm:justify-end items-start flex-wrap gap-5">
                                {
                                    close &&
                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        onClick={() => close()}
                                    >
                                        Back
                                    </button>
                                }
                                <button
                                    className="btn btn-sm btn-success text-white"
                                    onClick={() => openEdit(null)}
                                >
                                    New Link
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Edit</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Url</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.map(
                                        (link: Link, index: number, array: Link[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(link)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
                                                        onClick={() => openOrCloseDelete(link)}
                                                    />
                                                </th>
                                                <td>{link.id}</td>
                                                <td>{link.name}</td>
                                                <td>{link.url}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <LinkEdit link={selectedLink} profile={profile} close={closeEdit} />
            }
            {
                showConfirmModal &&
                <Modal>
                    <h2 className="text-gray-900 text-xl">
                        <span>Delete </span>
                        <span className="text-info">{selectedLink?.name}</span>
                        ?
                    </h2>
                    <div className="w-full flex justify-end items-center gap-5 py-5">
                        <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => openOrCloseDelete()}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => deleteItem()}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            }
        </div>
    )
}