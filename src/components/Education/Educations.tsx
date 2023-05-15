import { ProfileExtended, Education, Country } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import EducationEdit from "@/components/Education/EducationEdit"
import { useState } from "react"
import { format } from 'date-fns'
import { useRouter } from "next/router"

type props = { educations: Education[], countries: Country[], profile: ProfileExtended, close?: Function }

export default function Educations({ educations, countries, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedEducation, setSelectedEducation] = useState<Education | null>(null)

    const router = useRouter()

    function openEdit(education: Education | null) {
        setSelectedEducation(education)
        setShowEdit(true)
    }
    async function deleteItem(education: Education) {
        await fetch(
            `http://localhost:3000/api/education/${education.id}`,
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
        setSelectedEducation(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                <span>Educations</span>
                                <span>{educations.length}</span>
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
                                    New Education
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
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(education)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
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
                    : <EducationEdit education={selectedEducation} countries={countries} profile={profile} close={closeEdit} />}
        </div>
    )
}