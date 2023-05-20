import { Country, Education, ProfileExtended } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import eventBus from "@/lib/eventBus"
import dynamic from "next/dynamic"
import Spinner from "@/components/Spinner"

const TinyEditor = dynamic(() => import("@/components/TinyEditor"), { loading: () => <Spinner /> })

type props = { education: Education | null, countries: Country[], profile: ProfileExtended, close: Function }

export default function EducationEdit({ education, countries, profile, close }: props) {
    const [title, setTitle] = useState(education?.title || "")
    const [school, setSchool] = useState(education?.school || "")
    const [location, setLocation] = useState(education?.location || "")
    const [description, setDescription] = useState(education?.description || "")
    const [startDate, setStartDate] = useState(education ? new Date(education.startDate) : new Date())
    const [endDate, setEndDate] = useState(education ? new Date(education.endDate) : new Date())

    const router = useRouter()

    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            education ? `${process.env.NEXT_PUBLIC_HOST}/api/education/${education.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/education`,
            {
                body: JSON.stringify({
                    title: title,
                    school: school,
                    location: location,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                    profileId: profile?.id || null
                }),
                method: education ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                    <span>{education ? `Update ${education.title}` : 'Create Education'}</span>
                    <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                        <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => close()}
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => saveOrUpdate()}
                        >
                            {education ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        autoComplete="title"
                        className="input input-bordered w-full text-white"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">School</span>
                    </label>
                    <input
                        type="text"
                        name="school"
                        placeholder="school"
                        autoComplete="school"
                        className="input input-bordered w-full text-white"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Location</span>
                    </label>
                    <select
                        className="select select-bordered text-white"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    >
                        {
                            countries.map((country: Country, index: number, array: Country[]) => (

                                <option key={index} value={country.name}>{country.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Description</span>
                    </label>
                    <TinyEditor
                        content={description}
                        onChange={(e: string) => setDescription(e)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Start Date</span>
                    </label>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        className="input input-bordered w-full text-white"
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">End Date</span>
                    </label>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        className="input input-bordered w-full text-white"
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                    />
                </div>
            </div>
        </div>
    )
}