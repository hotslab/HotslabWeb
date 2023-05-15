import { Interest, ProfileExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import InterestEdit from "@/components/Interest/InterestEdit"
import { useState } from "react"
import { useRouter } from "next/router"

type props = { interests: Interest[], profile: ProfileExtended, close: Function }

export default function Interests({ interests, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)

    const router = useRouter()

    function openEdit(interest: Interest | null) {
        setSelectedInterest(interest)
        setShowEdit(true)
    }
    async function deleteItem(interest: Interest) {
        await fetch(
            `http://localhost:3000/api/interest/${interest.id}`,
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
        setSelectedInterest(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                <span>Interests</span>
                                <span>{interests.length}</span>
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
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(interest)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
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