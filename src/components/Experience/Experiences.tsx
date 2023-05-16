import { ProfileExtended, ExperienceExtended, Country } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import ExperienceEdit from "@/components/Experience/ExperienceEdit"
import { useState } from "react"
import { format } from 'date-fns'
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import Modal from "@/components/Modal"

type props = { experiences: ExperienceExtended[], countries: Country[], profile: ProfileExtended, close?: Function }

export default function Experiences({ experiences, countries, profile, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedExperience, setSelectedExperience] = useState<ExperienceExtended | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

    const router = useRouter()

    function openEdit(experience: ExperienceExtended | null) {
        setSelectedExperience(experience)
        setShowEdit(true)
    }
    function openOrCloseDelete(experience: ExperienceExtended | null = null) {
        setSelectedExperience(experience)
        setShowConfirmModal(experience ? true : false)
    }
    async function deleteItem() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            `http://localhost:3000/api/experience/${selectedExperience.id}`,
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
        setSelectedExperience(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                <span>Experiences</span>
                                <span>{experiences.length}</span>
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
                                    New Experience
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
                                        <th>Employment Type</th>
                                        <th>Company Name</th>
                                        <th>Location</th>
                                        <th>Location Type</th>
                                        <th>Is Current Position?</th>
                                        <th>Industry</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {experiences.map(
                                        (experience: ExperienceExtended, index: number, array: ExperienceExtended[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(experience)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
                                                        onClick={() => openOrCloseDelete(experience)}
                                                    />
                                                </th>
                                                <td>{experience.id}</td>
                                                <td>{experience.title}</td>
                                                <td>{experience.employmentType}</td>
                                                <td>{experience.companyName}</td>
                                                <td>{experience.location}</td>
                                                <td>{experience.locationType}</td>
                                                <td>{experience.isCurrentPosition}</td>
                                                <td>{experience.industry}</td>
                                                <td>
                                                    {experience.startDate ? format(new Date(experience.startDate), 'yyyy-MM-dd') : '-'}
                                                </td>
                                                <td>
                                                    {experience.endDate ? format(new Date(experience.endDate), 'yyyy-MM-dd') : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <ExperienceEdit experience={selectedExperience} countries={countries} profile={profile} close={closeEdit} />
            }
            {
                showConfirmModal &&
                <Modal>
                    <h2 className="text-gray-900 text-xl">
                        <span>Delete </span>
                        <span className="text-info">{selectedExperience?.title}</span>
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