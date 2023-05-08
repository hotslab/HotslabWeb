import { Achievement, Education, Experience, Interest, Link, ProfileExtended, ProjectClientExtended, ProjectExtended, ProjectSkillExtended, SkillExtended } from "@prisma/client"
import Image from "next/image"
import { MdAccountCircle } from "react-icons/md"
import { format } from 'date-fns'


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
                        <dt className="text-sm font-medium leading-6 text-secondary">Role</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.user.role.name}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Summary</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.summary || 'No summary information'}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Email</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.user.email}</dd>
                    </div>
                    {
                        profile.countryCode && profile.phoneNumber &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">Phone</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                                {profile.countryCode}
                                {profile.phoneNumber}
                            </dd>
                        </div>
                    }
                    {
                        profile.sex &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">Sex</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.sex}</dd>
                        </div>
                    }
                    {
                        profile.idNumber &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">ID Number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.idNumber}</dd>
                        </div>
                    }
                    {
                        profile.dob &&
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-secondary">Date of Birth</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                                {profile.dob ? format(new Date(profile.dob), 'yyyy-MM-dd') : '-'}
                            </dd>
                        </div>
                    }
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Street Address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.address}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">City</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.city}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Country</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.country}</dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-secondary">Post Code</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{profile.postcode}</dd>
                    </div>
                </div>
            </div>
            <div className="mt-6 mb-10">
                <dt className="font-medium text-gray-900 mb-5">Links</dt>
                <div className="">
                    {profile.links.map(
                        (link: Link, index: number, array: Link[]) => (
                            <div key={index} className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-secondary">{link.name}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                                    <a href={link.url} target="blank">{link.url}</a>
                                </dd>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5">Technical Skills</dt>
                <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                    {skills.map(
                        (skill: SkillExtended, index: number, array: SkillExtended[]) => (
                            <span key={index}>
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
                            <div key={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {project.projectName}
                                </div>
                                <div className="collapse-content">
                                    <div className="mt-5 mb-10">
                                        <dt className="font-medium mb-3">Description</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {project.description}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Duration</dt>
                                        <dd className="mt-2 text-sm flex justify-start items-center flex-wrap gap-1 text-gray-400">
                                            <span>From: {project.startDate ? format(new Date(project.startDate), 'yyyy-MM-dd') : '-'}</span>
                                            <span>-</span>
                                            <span>To: {project.endDate ? format(new Date(project.endDate), 'yyyy-MM-dd') : '-'}</span>
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Completed</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {project.isOngoing === true ? 'No' : 'Yes'}
                                        </dd>
                                    </div>
                                    {project.experiences && project.experiences?.length > 0 &&
                                        <div className="mb-10">
                                            <dt className="font-medium mb-3">Created Under</dt>
                                            <dd className="mt-2 text-sm text-gray-400">
                                                {project.experiences[0]?.experience.companyName}
                                            </dd>
                                        </div>
                                    }
                                    {project.clients && project.clients?.length > 0 &&
                                        <div className="mb-10">
                                            <dt className="font-medium mb-3">Client Name</dt>
                                            <dd className="mt-2 text-sm text-gray-400">
                                                {project.clients[0].client.company}
                                            </dd>
                                        </div>
                                    }
                                    {project.skills && project.skills?.length > 0 &&
                                        <div className="mb-10">
                                            <dt className="font-medium mb-3">Skills</dt>
                                            <dd className="mt-2 text-sm flex justify-start items-center flex-wrap gap-1 text-gray-400">
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
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5">Work Experience</dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.experiences.map(
                        (experience: Experience, index: number, array: Experience[]) => (
                            <div key={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {experience.companyName}
                                </div>
                                <div className="collapse-content">
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Position</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {experience.title}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Work Type and Location</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {experience.employmentType}, {experience.locationType}, {experience.location}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Industry</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {experience.industry}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Is Current Employment?</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {experience.isCurrentPosition === true ? 'Yes' : 'No'}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Duration</dt>
                                        <dd className="mt-2 text-sm flex justify-start items-center flex-wrap gap-1 text-gray-400">
                                            <span>From: {experience.startDate ? format(new Date(experience.startDate), 'yyyy-MM-dd') : '-'}</span>
                                            <span>-</span>
                                            <span>To: {experience.endDate ? format(new Date(experience.endDate), 'yyyy-MM-dd') : '-'}</span>
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Description</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {experience.description}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5">Education</dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.educations.map(
                        (education: Education, index: number, array: Education[]) => (
                            <div key={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {education.school}
                                </div>
                                <div className="collapse-content">
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Program or Course</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {education.title}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Description</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {education.description}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Location</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {education.location}
                                        </dd>
                                    </div>
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Duration</dt>
                                        <dd className="mt-2 text-sm flex justify-start items-center flex-wrap gap-1 text-gray-400">
                                            <span>From: {education.startDate ? format(new Date(education.startDate), 'yyyy-MM-dd') : '-'}</span>
                                            <span>-</span>
                                            <span>To: {education.endDate ? format(new Date(education.endDate), 'yyyy-MM-dd') : '-'}</span>
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5">Achievements</dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.achievements.map(
                        (achievement: Achievement, index: number, array: Achievement[]) => (
                            <div key={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {achievement.name}
                                </div>
                                <div className="collapse-content">
                                    <div className="mb-10">
                                        <dt className="font-medium mb-3">Description</dt>
                                        <dd className="mt-2 text-sm text-gray-400">
                                            {achievement.description}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5">Interests</dt>
                <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                    {profile.interests.map(
                        (interest: Interest, index: number, array: Interest[]) => (
                            <span key={index}>
                                {interest.name}
                                {index + 1 < array.length ? "," : ""}
                            </span>
                        ))}
                </dd>
            </div>
        </div>
    )
}