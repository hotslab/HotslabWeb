import { Link, ProfileExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import LinkEdit from "@/components/Link/LinkEdit"
import { useState } from "react"
import { useRouter } from "next/router"

type props = { links: Link[], profile: ProfileExtended, close: Function }

export default function Links({ links, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedLink, setSelectedLink] = useState<Link | null>(null)

    const router = useRouter()

    function openEdit(link: Link | null) {
        setSelectedLink(link)
        setShowEdit(true)
    }
    async function deleteItem(link: Link) {
        await fetch(
            `http://localhost:3000/api/link/${link.id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                if (response.ok) router.replace(router.asPath)
                else console.error(response.body)
            })
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
                        <div className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                            <span className="text-lg">
                                Links
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
                                                        onClick={() => deleteItem(link)}
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
                    : <LinkEdit link={selectedLink} profile={profile} close={closeEdit} />}
        </div>
    )
}