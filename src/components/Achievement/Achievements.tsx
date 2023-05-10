import { ProfileExtended, Achievement } from "@prisma/client"
import { MdDelete, MdEdit } from "react-icons/md"
import AchievementEdit from "@/components/Achievement/AchievementEdit"
import { useState } from "react"

type props = { achievements: Achievement[], profile: ProfileExtended, close: Function }

export default function Achievements({ achievements, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
    function openEdit(achievement: Achievement | null) {
        setSelectedAchievement(achievement)
        setShowEdit(true)
    }
    function deleteItem(achievement: Achievement) {
        //
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
                        <div className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                            <span className="text-lg">
                                Achievements
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
                                                    <MdEdit
                                                        title="Edit"
                                                        className=""
                                                        onClick={() => openEdit(achievement)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className=""
                                                        onClick={() => deleteItem(achievement)}
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
                    : <AchievementEdit achievement={selectedAchievement} profile={profile} close={closeEdit} />}
        </div>
    )
}