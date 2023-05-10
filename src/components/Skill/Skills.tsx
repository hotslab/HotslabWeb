import { ProfileExtended, Skill } from "@prisma/client"
import { MdDelete, MdEdit } from "react-icons/md"
import SkillEdit from "@/components/Skill/SkilEdit"
import { useState } from "react"

type props = { skills: Skill[], profile: ProfileExtended, close: Function }

export default function Skills({ skills, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
    function openEdit(skill: Skill | null) {
        setSelectedSkill(skill)
        setShowEdit(true)
    }
    function deleteItem(skill: Skill) {
        //
    }
    function closeEdit() {
        setSelectedSkill(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                            <span className="text-lg">
                                Skills
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
                                    New Skill
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
                                    {skills.map(
                                        (skill: Skill, index: number, array: Skill[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEdit
                                                        title="Edit"
                                                        className=""
                                                        onClick={() => openEdit(skill)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className=""
                                                        onClick={() => deleteItem(skill)}
                                                    />
                                                </th>
                                                <td>{skill.id}</td>
                                                <td>{skill.name}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <SkillEdit skill={selectedSkill} profile={profile} close={closeEdit} />}
        </div>
    )
}