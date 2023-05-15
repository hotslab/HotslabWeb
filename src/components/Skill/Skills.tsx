import { SkillExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import SkillEdit from "@/components/Skill/SkilEdit"
import { useState } from "react"
import { useRouter } from "next/router"

type props = {
    skills: SkillExtended[] | []
    close?: Function
}

export default function Skills({ skills, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedSkill, setSelectedSkill] = useState<SkillExtended | null>(null)

    const router = useRouter()

    function openEdit(skill: SkillExtended | null) {
        setSelectedSkill(skill)
        setShowEdit(true)
    }
    async function deleteItem(skill: SkillExtended) {
        await fetch(
            `http://localhost:3000/api/skill/${skill.id}`,
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
        setSelectedSkill(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                <span>Skills</span>
                                <span>{skills.length}</span>
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
                                        (skill: SkillExtended, index: number, array: SkillExtended[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(skill)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
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
                    : <SkillEdit skill={selectedSkill} close={closeEdit} />}
        </div>
    )
}