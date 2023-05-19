import { ExperienceExtended, ExperienceSkillExtended, ProfileExtended, ProjectExperienceExtended, Project, Skill, Country } from "@prisma/client"
import { useState, useEffect, useCallback } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MdDelete, MdAddBox } from "react-icons/md"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import TinyEditor from "@/components/TinyEditor"

type props = { experience: ExperienceExtended | null, countries: Country[], profile: ProfileExtended | null, close: Function }

export default function ExperienceEdit({ experience, countries, profile, close }: props) {
    const [editSection, setEditSection] = useState<string | null>(null)
    const [title, setTitle] = useState(experience?.title || "")
    const [employmentType, setEmploymentType] = useState(experience?.employmentType || "")
    const [companyName, setCompanyName] = useState(experience?.companyName || "")
    const [location, setLocation] = useState(experience?.location || "")
    const [locationType, setLocationType] = useState(experience?.locationType || "")
    const [isCurrentPosition, setIsCurrentPosition] = useState(experience ? Boolean(experience.isCurrentPosition) : false)
    const [industry, setIndustry] = useState(experience?.industry || "")
    const [description, setDescription] = useState(experience?.description || "")
    const [startDate, setStartDate] = useState(experience ? new Date(experience.startDate) : new Date())
    const [endDate, setEndDate] = useState(experience ? new Date(experience.endDate) : new Date())
    const [unlinkedProjects, setUnlinkedProjects] = useState<Project[] | []>([])
    const [unlinkedSkills, setUnlinkedSkills] = useState<Skill[] | []>([])

    const router = useRouter()

    function openEdit(section: string) {
        setEditSection(section)
    }
    function closeEditSection() {
        setEditSection(null)
    }
    async function unlinkProjectExperience(projectExperienceId: number) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/experience/project?id=${projectExperienceId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function linkProject(project: Project) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/experience/project`, {
            body: JSON.stringify({
                experienceId: experience?.id,
                projectId: project.id
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function unlinkExperienceSkill(experienceSkillId: number) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/experience/skill?id=${experienceSkillId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function linkSkill(skill: Skill) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/experience/skill`, {
            body: JSON.stringify({
                experienceId: experience?.id,
                skillId: skill.id
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    const getUnlinkedProjects = useCallback(async () => {
        if (experience && experience.id && unlinkedProjects.length === 0) {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project?notExperienceId=${experience.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedProjects((await response.json()).data)
            })
        }
    }, [experience, unlinkedProjects])
    const getUnlinkedSkills = useCallback(async () => {
        if (experience && experience.id && unlinkedProjects.length === 0) {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/skill?notExperienceId=${experience.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedSkills((await response.json()).data)
            })
        }
    }, [experience, unlinkedProjects])
    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            experience ? `${process.env.NEXT_PUBLIC_HOST}/api/experience/${experience.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/experience`,
            {
                body: JSON.stringify({
                    title: title,
                    employmentType: employmentType,
                    companyName: companyName,
                    location: location,
                    locationType: locationType,
                    isCurrentPosition: isCurrentPosition,
                    industry: industry,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                    profileId: profile?.id || null
                }),
                method: experience ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    useEffect(() => { getUnlinkedProjects(), getUnlinkedSkills() }, [getUnlinkedProjects, getUnlinkedSkills])

    return (
        <div>
            {editSection === null &&
                <div className="w-full">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>{experience ? `Update ${experience.title}` : 'Create Experience'}</span>
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
                                    {experience ? 'Update' : 'Save'}
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
                                <span className="label-text text-gray-600">Employment Type</span>
                            </label>
                            <select
                                className="select select-bordered text-white"
                                value={employmentType}
                                onChange={e => setEmploymentType(e.target.value)}
                            >
                                <option value="FullTime">Full Time</option>
                                <option value="PartTime">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Temporary">Onsite</option>
                                <option value="SelfEmployed">Self Employed</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Company Name</span>
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="companyName"
                                autoComplete="companyName"
                                className="input input-bordered w-full text-white"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
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
                                <span className="label-text text-gray-600">Location Type</span>
                            </label>
                            <select
                                className="select select-bordered text-white"
                                value={locationType}
                                onChange={e => setLocationType(e.target.value)}
                            >
                                <option value="Hybrid">Hybrid</option>
                                <option value="Remote">Remote</option>
                                <option value="Onsite">Onsite</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Industry</span>
                            </label>
                            <input
                                type="text"
                                name="industry"
                                placeholder="industry"
                                autoComplete="industry"
                                className="input input-bordered w-full text-white"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            />
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
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">isCurrentPosition</span>
                            </label>
                            <input
                                type="checkbox"
                                name="isCurrentPosition"
                                className="toggle"
                                checked={Boolean(isCurrentPosition)}
                                onChange={(e) => setIsCurrentPosition(isCurrentPosition ? false : true)}
                            />
                        </div>
                    </div>
                    {
                        experience &&
                        <div className="mt-10 mb-10">
                            <dt className="font-medium text-gray-900 mb-0 flex justify-between items-center flex-wrap gap-3">
                                <span>Projects</span>
                                <button
                                    title="Add new experience"
                                    className="btn btn-xs text-white btn-success"
                                    onClick={() => openEdit('projects')}
                                >
                                    Add
                                </button>
                            </dt>
                            <dd className="mt-3">
                                <div className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                    <input type="checkbox" />
                                    <div className="w-full collapse-title text-md font-medium flex justify-between items-center flex-wrap">
                                        <span>Linked Projects List</span>
                                    </div>
                                    <div className="mt-2 collapse-content text-sm">
                                        {
                                            experience && experience.projects.length > 0
                                                ? experience.projects.map(
                                                    (projectExperience: ProjectExperienceExtended, index: number, array: ProjectExperienceExtended[]) => (
                                                        <div key={index} className="py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                                            <div className="w-full sm:w-[90%]">
                                                                {index + 1}. {projectExperience.project.projectName}
                                                            </div>
                                                            <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                                                <MdDelete
                                                                    title={`Delete ${projectExperience.project.projectName}`}
                                                                    className="text-error text-2xl cursor-pointer"
                                                                    onClick={() => unlinkProjectExperience(projectExperience.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                : <div className="">No projects listed</div>
                                        }
                                    </div>
                                </div>
                            </dd>
                        </div>
                    }
                    {
                        experience &&
                        <div className="mt-10 mb-10">
                            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                                <span>Skills</span>
                                <button
                                    title="Add new skill"
                                    className="btn btn-xs text-white btn-success"
                                    onClick={() => openEdit('skills')}
                                >
                                    Add
                                </button>
                            </dt>
                            <dd className="mt-2">
                                <div className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                    <input type="checkbox" />
                                    <div className="w-full collapse-title text-md font-medium flex justify-between items-center flex-wrap">
                                        <span>Linked Skills List</span>
                                    </div>
                                    <div className="mt-2 collapse-content text-sm">
                                        {
                                            experience && experience.skills.length > 0
                                                ? experience.skills.map(
                                                    (experienceSkill: ExperienceSkillExtended, index: number, array: ExperienceSkillExtended[]) => (
                                                        <div key={index} className="py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                                            <div className="w-full sm:w-[90%]">
                                                                {index + 1}. {experienceSkill.skill.name}
                                                            </div>
                                                            <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                                                <MdDelete
                                                                    title={`Delete ${experienceSkill.skill.name}`}
                                                                    className="text-error text-2xl cursor-pointer"
                                                                    onClick={() => unlinkExperienceSkill(experienceSkill.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                : <div className="">No skills listed</div>
                                        }
                                    </div>
                                </div>
                            </dd>
                        </div>
                    }
                </div>
            }
            {
                editSection === "skills" &&
                <div className="">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>Link Unlinked Skills</span>
                            <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => closeEditSection()}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                        {

                            unlinkedSkills.map(
                                (skill: Skill, index: number, array: Skill[]) => (
                                    <div key={index} className="w-full py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                        <div className="text-gray-900 w-full sm:w-[90%]">
                                            {index + 1}. {skill.name}
                                        </div>
                                        <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                            <MdAddBox
                                                title={`Link ${skill.name}`}
                                                className="text-success text-2xl cursor-pointer"
                                                onClick={() => linkSkill(skill)}
                                            />
                                        </div>
                                    </div>
                                ))
                        }
                    </dd>
                </div>
            }
            {
                editSection === "projects" &&
                <div className="">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>Link Unlinked Projects</span>
                            <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => closeEditSection()}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                        {

                            unlinkedProjects.map(
                                (project: Project, index: number, array: Project[]) => (
                                    <div key={index} className="w-full py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                        <div className="text-gray-900 w-full sm:w-[90%]">
                                            {index + 1}. {project.projectName}
                                        </div>
                                        <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                            <MdAddBox
                                                title={`Link ${project.projectName}`}
                                                className="text-success text-2xl cursor-pointer"
                                                onClick={() => linkProject(project)}
                                            />
                                        </div>
                                    </div>
                                ))
                        }
                    </dd>
                </div>
            }
        </div>
    )
}