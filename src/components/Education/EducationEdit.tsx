import { Education, ProfileExtended } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type props = { education: Education | null, profile: ProfileExtended, close: Function }

export default function EducationEdit({ education, profile, close }: props) {
    const [title, setTitle] = useState(education?.title || "")
    const [school, setSchool] = useState(education?.school || "")
    const [location, setLocation] = useState(education?.location || "")
    const [description, setDescription] = useState(education?.description || "")
    const [startDate, setStartDate] = useState(education ? new Date(education.startDate) : "")
    const [endDate, setEndDate] = useState(education ? new Date(education.endDate) : "")

    const router = useRouter()

    async function saveOrUpdate() {
        await fetch(
            education ? `http://localhost:3000/api/education/${education.id}` : `http://localhost:3000/api/education`,
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
                else console.error(response.body)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="w-full">
            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                <span className="text-lg">
                    {education ? `Update ${education.school}` : 'Create Education'}
                </span>
                <div className="flex justify-between items-start flex-wrap gap-10">
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
            </dt>
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
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Location</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="location"
                        autoComplete="location"
                        className="input input-bordered w-full"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Description</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="description"
                        className="textarea textarea-bordered"
                        cols={30}
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Start Date</span>
                    </label>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full"
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                    />
                </div>
            </div>
        </div>
    )
}