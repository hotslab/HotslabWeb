import { ProfileExtended, Achievement } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import AchievementEdit from "@/components/Achievement/AchievementEdit"
import { useState } from "react"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import Modal from "@/components/Modal"

type props = { achievements: Achievement[], profile: ProfileExtended, close?: Function }

export default function Achievements({ achievements, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

    const router = useRouter()

    function openEdit(achievement: Achievement | null) {
        setSelectedAchievement(achievement)
        setShowEdit(true)
    }
    function openOrCloseDelete(achievement: Achievement | null = null) {
        setSelectedAchievement(achievement)
        setShowConfirmModal(achievement ? true : false)
    }
    async function deleteItem() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            `http://localhost:3000/api/achievement/${selectedAchievement.id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                if (response.ok) router.replace(router.asPath)
                else eventBus.dispatch("openErrorModal", response.body)
                openOrCloseDelete()
                eventBus.dispatch("openLoadingPage", false)
            })
    }
    function closeEdit() {
        setSelectedAchievement(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                <span>Achievements</span>
                                <span>{achievements.length}</span>
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
                                    New Achievement
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
                                    {achievements.map(
                                        (achievement: Achievement, index: number, array: Achievement[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(achievement)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
                                                        onClick={() => openOrCloseDelete(achievement)}
                                                    />
                                                </th>
                                                <td>{achievement.id}</td>
                                                <td>{achievement.name}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <AchievementEdit achievement={selectedAchievement} profile={profile} close={closeEdit} />
            }
            {
                showConfirmModal &&
                <Modal>
                    <h2 className="text-gray-900 text-xl">
                        <span>Delete </span>
                        <span className="text-info">{selectedAchievement?.name}</span>
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