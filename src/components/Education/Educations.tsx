import { ProfileExtended, Education } from "@prisma/client"
import { MdDelete, MdEdit } from "react-icons/md"
import EducationEdit from "@/components/Education/EducationEdit"
import { useState } from "react"
import { format } from 'date-fns'

type props = { educations: Education[], profile: ProfileExtended, close: Function }

export default function Educations({ educations, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedEducation, setSelectedEducation] = useState<Education | null>(null)
    function openEdit(education: Education | null) {
        setSelectedEducation(education)
        setShowEdit(true)
    }
    function deleteItem(education: Education) {
        //
    }
    function closeEdit() {
        setSelectedEducation(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                            <span className="text-lg">
                                Educations
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
                                    New Educations
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
                                        <th>Title</th>
                                        <th>School</th>
                                        <th>Location</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {educations.map(
                                        (education: Education, index: number, array: Education[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEdit
                                                        title="Edit"
                                                        className=""
                                                        onClick={() => openEdit(education)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className=""
                                                        onClick={() => deleteItem(education)}
                                                    />
                                                </th>
                                                <td>{education.id}</td>
                                                <td>{education.title}</td>
                                                <td>{education.school}</td>
                                                <td>{education.location}</td>
                                                <td>
                                                    {education.startDate ? format(new Date(education.startDate), 'yyyy-MM-dd') : '-'}
                                                </td>
                                                <td>
                                                    {education.endDate ? format(new Date(education.endDate), 'yyyy-MM-dd') : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <EducationEdit education={selectedEducation} profile={profile} close={closeEdit} />}
        </div>
    )
}