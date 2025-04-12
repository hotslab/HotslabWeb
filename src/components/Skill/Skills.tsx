import { SkillExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import SkillEdit from "@/components/Skill/SkilEdit"
import { useState } from "react"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import Modal from "@/components/Modal"

type props = {
    skills: SkillExtended[] | []
    close?: Function
}

export default function Skills({ skills, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedSkill, setSelectedSkill] = useState<SkillExtended | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

    const router = useRouter()

    function openEdit(skill: SkillExtended | null) {
        setSelectedSkill(skill)
        setShowEdit(true)
    }
    function openOrCloseDelete(skill: SkillExtended | null = null) {
        setSelectedSkill(skill)
        setShowConfirmModal(skill ? true : false)
    }
    async function deleteItem() {
        if (selectedSkill) {
            eventBus.dispatch("openLoadingPage", false)
            await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/skill/${selectedSkill.id}`,
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
        } else eventBus.dispatch("openErrorModal", "Skill selected for deletion is missing")
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
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3 text-white">
                            <div className="flex justify-between items-center flex-wrap gap-3 text-2xl font-bold">
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
                            <table className="table w-full text-white">
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
                                                        onClick={() => openOrCloseDelete(skill)}
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
                    : <SkillEdit skill={selectedSkill} close={closeEdit} />
            }
            {
                showConfirmModal &&
                <Modal>
                    <h2 className="text-gray-900 text-xl">
                        <span>Delete </span>
                        <span className="text-error">{selectedSkill?.name}</span>
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