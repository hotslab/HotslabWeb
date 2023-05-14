import { Achievement, Country, Education, Experience, Interest, Link, ProfileExtended, ProjectClientExtended, ProjectExtended, ProjectSkillExtended, ProjectTagExtended, Role, SkillExtended } from "@prisma/client"
import Image from "next/image"
import { format } from 'date-fns'
import { MdEditSquare, MdAccountCircle } from "react-icons/md"
import { useState } from "react"
import UserEdit from "@/components/User/UserEdit"
import ProfileEdit from "@/components/Profile/ProfileEdit"
import Links from "@/components/Link/Links"
import Skills from "@/components/Skill/Skills"
import Interests from "@/components/Interest/Interests"
import Achievements from "@/components/Achievement/Achievements"
import Educations from "@/components/Education/Educations"
import Experiences from "@/components/Experience/Experiences"
import Projects from "@/components/Project/Projects"

type Props = {
    profile: ProfileExtended
    skills: SkillExtended[]
    countries: Country[]
    roles: Role[]
}

export default function UserProfile({ profile, skills, countries, roles }: Props) {
    const [editSection, setEditSection] = useState<string | null>(null)
    function openEdit(section: string) {
        setEditSection(section)
    }
    function close() {
        setEditSection(null)
    }

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
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Personal Information</span>
                    <div className="flex justify-between items-start flex-wrap gap-10">
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => openEdit('user')}
                        >
                            Edit User
                        </button>
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => openEdit('profile')}
                        >
                            Edit Profile
                        </button>
                    </div>
                </dt>
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
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Links</span>
                    <MdEditSquare
                        title="Edit"
                        className="text-success text-xl cursor-pointer"
                        onClick={() => openEdit('links')}
                    />
                </dt>
                <div className="">
                    {profile.links.map(
                        (link: Link, index: number, array: Link[]) => (
                            <div key={index} className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-secondary">{index + 1}. {link.name}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                                    <a href={link.url} target="blank">{link.url}</a>
                                </dd>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Technical Skills</span>
                    <span>{skills.length}</span>
                </dt>
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
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Projects</span>
                    <MdEditSquare
                        title="Edit"
                        className="text-success text-xl cursor-pointer"
                        onClick={() => openEdit('projects')}
                    />
                </dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.projects.map(
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
                                    {project.tags && project.tags?.length > 0 &&
                                        <div className="mb-10">
                                            <dt className="font-medium mb-3">Tags</dt>
                                            <dd className="mt-2 text-sm flex justify-start items-center flex-wrap gap-1 text-gray-400">
                                                {project.tags?.map(
                                                    (tag: ProjectTagExtended, index: number, array: ProjectTagExtended[]) => (
                                                        <span key={index}>
                                                            {tag.tag.name}
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
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Work Experience</span>
                    <MdEditSquare
                        title="Edit"
                        className="text-success text-xl cursor-pointer"
                        onClick={() => openEdit('experiences')}
                    />
                </dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.experiences.map(
                        (experience: Experience, index: number, array: Experience[]) => (
                            <div key={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {experience.companyName}
                                </div>
                                <div className="collapse-content">
                                    <div className="mt-5 mb-10">
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
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Education</span>
                    <MdEditSquare
                        title="Edit"
                        className="text-success text-xl cursor-pointer"
                        onClick={() => openEdit('educations')}
                    />
                </dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.educations.map(
                        (education: Education, index: number, array: Education[]) => (
                            <div key={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {education.school}
                                </div>
                                <div className="collapse-content">
                                    <div className="mt-5 mb-10">
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
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Achievements</span>
                    <MdEditSquare
                        title="Edit"
                        className="text-success text-xl cursor-pointer"
                        onClick={() => openEdit('achievements')}
                    />
                </dt>
                <div className="w-full flex flex-col justify-between items-center gap-3">
                    {profile.achievements.map(
                        (achievement: Achievement, index: number, array: Achievement[]) => (
                            <div key={index} className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {achievement.name}
                                </div>
                                <div className="collapse-content">
                                    <div className="mt-5 mb-10">
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
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span>Interests</span>
                    <MdEditSquare
                        title="Edit"
                        className="text-success text-xl cursor-pointer"
                        onClick={() => openEdit('interests')}
                    />
                </dt>
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
            {
                editSection !== null &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 w-[98%] sm:w-[80%] p-3 sm:p-8">
                                {/* Content */}
                                {
                                    editSection === "user" &&
                                    <UserEdit
                                        user={profile.user}
                                        roles={roles}
                                        close={close}
                                    />
                                }
                                {
                                    editSection === "profile" &&
                                    <ProfileEdit
                                        profile={profile}
                                        user={profile.user}
                                        countries={countries}
                                        close={close}
                                    />
                                }
                                {
                                    editSection === "links" &&
                                    <Links
                                        links={profile.links}
                                        profile={profile}
                                        close={close}
                                    />
                                }
                                {
                                    editSection === "interests" &&
                                    <Interests
                                        interests={profile.interests}
                                        profile={profile}
                                        close={close}
                                    />
                                }
                                {
                                    editSection === "achievements" &&
                                    <Achievements
                                        achievements={profile.achievements}
                                        profile={profile}
                                        close={close}
                                    />
                                }
                                {
                                    editSection === "educations" &&
                                    < Educations
                                        educations={profile.educations}
                                        profile={profile}
                                        close={close}
                                    />
                                }
                                {
                                    editSection === "experiences" &&
                                    <Experiences
                                        experiences={profile.experiences}
                                        profile={profile}
                                        close={close}
                                    />
                                }
                                {
                                    editSection === "projects" &&
                                    <Projects
                                        projects={profile.projects}
                                        profile={profile}
                                        close={close}
                                    />
                                }
                                {/* End of Content */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}