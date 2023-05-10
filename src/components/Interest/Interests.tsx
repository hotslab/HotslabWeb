import { Interest, ProfileExtended } from "@prisma/client"
import { MdDelete, MdEdit } from "react-icons/md"
import InterestEdit from "@/components/Interest/InterestEdit"
import { useState } from "react"

type props = { interests: Interest[], profile: ProfileExtended, close: Function }

export default function Interests({ interests, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)
    function openEdit(interest: Interest | null) {
        setSelectedInterest(interest)
        setShowEdit(true)
    }
    function deleteItem(interest: Interest) {
        //
    }
    function closeEdit() {
        setSelectedInterest(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                            <span className="text-lg">
                                Interests
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
                                    New Interest
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
                                    {interests.map(
                                        (interest: Interest, index: number, array: Interest[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEdit
                                                        title="Edit"
                                                        className=""
                                                        onClick={() => openEdit(interest)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className=""
                                                        onClick={() => deleteItem(interest)}
                                                    />
                                                </th>
                                                <td>{interest.id}</td>
                                                <td>{interest.name}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <InterestEdit interest={selectedInterest} profile={profile} close={closeEdit} />}
        </div>
    )
}