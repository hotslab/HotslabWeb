import { Tag } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import TagEdit from "@/components/Tag/TagEdit"
import { useState } from "react"

type props = {
    tags: Tag[] | []
    close: Function
}

export default function Tags({ tags, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
    function openEdit(skill: Tag | null) {
        setSelectedTag(skill)
        setShowEdit(true)
    }
    function deleteItem(skill: Tag) {
        //
    }
    function closeEdit() {
        setSelectedTag(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                            <span className="text-lg">
                                Tags
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
                                    New Tag
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.map(
                                        (tag: Tag, index: number, array: Tag[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(tag)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
                                                        onClick={() => deleteItem(tag)}
                                                    />
                                                </th>
                                                <td>{tag.id}</td>
                                                <td>{tag.name}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <TagEdit tag={selectedTag} close={closeEdit} />}
        </div>
    )
}