import { ProfileExtended, ProjectExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import ProjectEdit from "@/components/Project/ProjectEdit"
import { useState } from "react"
import { format } from 'date-fns'

type props = { projects: ProjectExtended[], profile: ProfileExtended, close: Function }

export default function Projects({ projects, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedProject, setSelectedProject] = useState<ProjectExtended | null>(null)
    function openEdit(project: ProjectExtended | null) {
        setSelectedProject(project)
        setShowEdit(true)
    }
    function deleteItem(experience: ProjectExtended) {
        //
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
                        <div className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                            <span className="text-lg">
                                Projects
                            </span>
                            <div className="flex justify-between items-start flex-wrap gap-10">
                                <button
                                    className="btn btn-sm text-white btn-error"
                                    onClick={() => close()}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-sm text-white btn-success"
                                    onClick={() => openEdit(null)}
                                >
                                    New Project
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto bg-white">
                            <table className="table bg-white w-full">
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
                                                        onClick={() => deleteItem(project)}
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
                    : <ProjectEdit project={selectedProject} profile={profile} close={closeEdit} />}
        </div>
    )
}