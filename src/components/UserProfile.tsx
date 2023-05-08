import { ProfileExtended, ProjectClientExtended, ProjectExtended, ProjectSkillExtended, SkillExtended } from "@prisma/client"
import Image from "next/image"
import { MdAccountCircle } from "react-icons/md"
import { format } from 'date-fns'
import { profile } from "console"


type Props = {
    profile: ProfileExtended
    skills: SkillExtended[]
}
export default function UserProfile({ profile, skills }: Props) {
    return (
        <div>
            <div className="px-4 py-6 bg-base-100 w-full min-[420px]:w-1/3 lg:w-1/4 mb-10 flex items-center justify-center">
                {
                    profile.imageUrl
                        ? <Image
                            src={profile.imageUrl}
                            alt={`${profile.user.name} ${profile.user.surname}`}
                            width={200}
                            height={200}
                            className="mask mask-circle"
                        />
                        : <MdAccountCircle className="text-[200px] h-[100%]" />
                }
            </div>
            <div className="mt-6 mb-10">
                <dt className="font-medium text-gray-900 mb-5">Personal Information</dt>
                <div className="">
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Summary</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.summary || 'No summary information'}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Email</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.user.email}</dd>
                    </div>
                    {
                        profile.countryCode && profile.phoneNumber &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">Phone</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile.countryCode}
                                {profile.phoneNumber}
                            </dd>
                        </div>
                    }
                    {
                        profile.sex &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">Sex</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.sex}</dd>
                        </div>
                    }
                    {
                        profile.idNumber &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">ID Number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.idNumber}</dd>
                        </div>
                    }
                    {
                        profile.dob &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">Date of Birth</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile.dob ? format(new Date(profile.dob), 'yyyy-MM-dd') : '-'}
                            </dd>
                        </div>
                    }
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Street Address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.address}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">City</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.city}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Country</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.country}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Post Code</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.postcode}</dd>
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5">Technical Skills</dt>
                <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                    {skills.map(
                        (skill: SkillExtended, index: number, array: SkillExtended[]) => (
                            <span key={skill.id}>
                                {skill.name}
                                {index + 1 < array.length ? "," : ""}
                            </span>
                        ))}
                </dd>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5">Projects</dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.projects.filter((project: ProjectExtended, index: number, array: ProjectExtended[]) => {
                        if (project.tags && project.tags?.findIndex(e => e.tag.name === "project") > -1)
                            return project
                    }).map(
                        (project: ProjectExtended, index: number, array: ProjectExtended[]) => (
                            <div key={index} tabIndex={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {project.projectName}
                                </div>
                                <div className="collapse-content">
                                    <div className="mb-10">
                                        <dt className="font-medium mb-5">Description</dt>
                                        <dd className="mt-2 text-sm">
                                            {project.description}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-5">Duration</dt>
                                        <dd className="mt-2 text-sm flex justify-start items-center flex-wrap gap-1">
                                            <span>From: {project.startDate ? format(new Date(project.startDate), 'yyyy-MM-dd') : '-'}</span>
                                            <span>-</span>
                                            <span>To: {project.endDate ? format(new Date(project.endDate), 'yyyy-MM-dd') : '-'}</span>
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-5">Completed</dt>
                                        <dd className="mt-2 text-sm">
                                            {project.isOngoing === true ? 'No' : 'Yes'}
                                        </dd>
                                    </div>
                                    {project.experiences && project.experiences?.length > 0 &&
                                        <div className="mb-10">
                                            <dt className="font-medium mb-5">Created Under</dt>
                                            <dd className="mt-2 text-sm">
                                                {project.experiences[0]?.experience.companyName}
                                            </dd>
                                        </div>
                                    }
                                    {project.clients && project.clients?.length > 0 &&
                                        <div className="mb-10">
                                            <dt className="font-medium mb-5">Client Name</dt>
                                            <dd className="mt-2 text-sm">
                                                {project.clients[0].client.company}
                                            </dd>
                                        </div>
                                    }
                                    {project.skills && project.skills?.length > 0 &&
                                        <div className="mb-10">
                                            <dt className="font-medium mb-5">Skills</dt>
                                            <dd className="mt-2 text-sm flex justify-start items-center flex-wrap gap-1">
                                                {project.skills?.map(
                                                    (skill: ProjectSkillExtended, index: number, array: ProjectSkillExtended[]) => (
                                                        <span key={index}>
                                                            {skill.skill.name}
                                                            {index + 1 < array.length ? "," : ""}
                                                        </span>
                                                    ))}
                                            </dd>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}