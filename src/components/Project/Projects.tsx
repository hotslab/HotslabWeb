import { ProfileExtended, ProjectExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import ProjectEdit from "@/components/Project/ProjectEdit"
import { useState } from "react"
import { format } from 'date-fns'
import eventBus from "@/lib/eventBus"
import { useRouter } from "next/router"
import Modal from "@/components/Modal"

type props = { projects: ProjectExtended[], profile: ProfileExtended, close?: Function }

export default function Projects({ projects, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedProject, setSelectedProject] = useState<ProjectExtended | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

    const router = useRouter()

    function openEdit(project: ProjectExtended | null) {
        setSelectedProject(project)
        setShowEdit(true)
    }
    function openOrCloseDelete(project: ProjectExtended | null = null) {
        setSelectedProject(project)
        setShowConfirmModal(project ? true : false)
    }
    async function deleteItem() {
        if (selectedProject) {
            eventBus.dispatch("openLoadingPage", true)
            await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/project/${selectedProject.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                    },
                }).then(async response => {
                    if (response.ok) {
                        if (router.pathname === "/profiles/[id]") eventBus.dispatch("refreshData")
                        router.replace(router.asPath)
                    } else eventBus.dispatch("openErrorModal", (await response.json()).data)
                    openOrCloseDelete()
                    eventBus.dispatch("openLoadingPage", false)
                })
        } else eventBus.dispatch("openErrorModal", "Project selected for deletion is missing")
    }
    function closeEdit() {
        setSelectedProject(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3 text-white">
                            <div className="flex justify-between items-center gap-3 flex-wrap text-2xl font-bold">
                                <span>Projects</span>
                                <span>{projects.length}</span>
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
                                    New Project
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto bg-white">
                            <table className="table bg-white w-full text-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Edit</th>
                                        <th>ID</th>
                                        <th>Project</th>
                                        <th>Is Ongoing?</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(
                                        (project: ProjectExtended, index: number, array: ProjectExtended[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(project)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
                                                        onClick={() => openOrCloseDelete(project)}
                                                    />
                                                </th>
                                                <td>{project.id}</td>
                                                <td>{project.projectName}</td>
                                                <td>{project.isOngoing}</td>
                                                <td>
                                                    {project.startDate ? format(new Date(project.startDate), 'yyyy-MM-dd') : '-'}
                                                </td>
                                                <td>
                                                    {project.endDate ? format(new Date(project.endDate), 'yyyy-MM-dd') : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <ProjectEdit project={selectedProject} profile={profile} close={closeEdit} />
            }
            {
                showConfirmModal &&
                <Modal>
                    <h2 className="text-gray-900 text-xl">
                        <span>Delete </span>
                        <span className="text-error">{selectedProject?.projectName}</span>
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