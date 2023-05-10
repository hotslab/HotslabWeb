import { Link, ProfileExtended } from "@prisma/client"
import { MdDelete, MdEdit } from "react-icons/md"
import LinkEdit from "@/components/Link/LinkEdit"
import { useState } from "react"

type props = { links: Link[], profile: ProfileExtended, close: Function }

export default function Links({ links, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedLink, setSelectedLink] = useState<Link | null>(null)
    function openEdit(link: Link | null) {
        setSelectedLink(link)
        setShowEdit(true)
    }
    function deleteItem(link: Link) {
        //
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
                                    className="btn btn-sm btn-error"
                                    onClick={() => close()}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-sm btn-success"
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
                                                    <MdEdit
                                                        title="Edit"
                                                        className=""
                                                        onClick={() => openEdit(link)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className=""
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