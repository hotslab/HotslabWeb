import {
    Achievement,
    Country,
    Education,
    Experience,
    Interest,
    Link,
    ProfileExtended,
    ProjectExtended,
    ProjectSkillExtended,
    ProjectTagExtended,
    Role,
    SkillExtended
} from "@prisma/client"
import { format } from 'date-fns'
import { MdEditSquare, MdAccountCircle, MdSettings } from "react-icons/md"
import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import DOMPurify from "isomorphic-dompurify"
import dynamic from 'next/dynamic'
import Spinner from "@/components/Spinner"

const Modal = dynamic(() => import("@/components/Modal"), { loading: () => <Spinner /> })
const UserEdit = dynamic(() => import("@/components/User/UserEdit"), { loading: () => <Spinner /> })
const ProfileEdit = dynamic(() => import("@/components/Profile/ProfileEdit"), { loading: () => <Spinner /> })
const Links = dynamic(() => import("@/components/Link/Links"), { loading: () => <Spinner /> })
const Interests = dynamic(() => import("@/components/Interest/Interests"), { loading: () => <Spinner /> })
const Achievements = dynamic(() => import("@/components/Achievement/Achievements"), { loading: () => <Spinner /> })
const Educations = dynamic(() => import("@/components/Education/Educations"), { loading: () => <Spinner /> })
const Experiences = dynamic(() => import("@/components/Experience/Experiences"), { loading: () => <Spinner /> })
const Projects = dynamic(() => import("@/components/Project/Projects"), { loading: () => <Spinner /> })

type Props = { profile: ProfileExtended }

export default function UserProfile({ profile }: Props) {
    const [editSection, setEditSection] = useState<string | null>(null)
    const [skills, setSkills] = useState<SkillExtended[] | []>([])
    const [countries, setCountries] = useState<Country[] | []>([])
    const [roles, setRoles] = useState<Role[] | []>([])

    const { data: session, status } = useSession()

    function openEdit(section: string) {
        setEditSection(section)
    }
    function close() {
        setEditSection(null)
    }
    function getDisplayImage(url: string | null): string | null {
        return url ? `'${process.env.NEXT_PUBLIC_IMAGE_HOST}/${url}'` : null
    }
    const getRoles = useCallback(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/role`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        }).then(async response => setRoles((await response.json()).data))
    }, [])
    const getCountries = useCallback(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/country`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        }).then(async response => setCountries((await response.json()).data))
    }, [])
    const getSkills = useCallback(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/skill?profileId=${profile.id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => setSkills((await response.json()).data))
    }, [profile.id])

    useEffect(() => { getRoles(), getCountries(), getSkills() }, [getRoles, getCountries, getSkills])

    return (
        <div>
            <div className="p-0 w-full flex items-center justify-start">
                {
                    profile && profile.imageUrl
                        ? <div
                            title={`${profile.user.name} ${profile.user.surname}`}
                            style={{
                                backgroundImage: `url(${getDisplayImage(profile.imageUrl)})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}
                            className="w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] p-0 rounded-full"
                        >
                        </div>
                        : <MdAccountCircle className="text-[200px] text-success h-[100%] p-0 m-0" />
                }
            </div>
            <div className="mt-6 mb-10">
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span className="text-xl">Personal Information</span>
                    {
                        status === "authenticated"
                        && (session.user.role === "Owner" || session.user.role === "Admin")
                        &&
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
                    }
                </dt>
                <div className="">
                    {
                        status === "authenticated" &&
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-secondary">Role</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.user.role.name || "-"}</dd>
                        </div>
                    }
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium leading-6 text-secondary">Summary</dt>
                        <dd
                            className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profile.summary || 'No summary information') }}
                        />
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium leading-6 text-secondary">Email</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.user.email || "-"}</dd>
                    </div>
                    {
                        status === "authenticated" &&
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-secondary">Phone</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {
                                    profile.countryCode && profile.phoneNumber
                                        ? `${profile.countryCode}${profile.phoneNumber}`
                                        : "-"
                                }
                            </dd>
                        </div>
                    }
                    {
                        status === "authenticated" &&
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-secondary">Sex</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.sex || "-"}</dd>
                        </div>
                    }
                    {
                        status === "authenticated" &&
                        <div className="px-0 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-secondary">ID Number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.idNumber || "-"}</dd>
                        </div>
                    }
                    {
                        status === "authenticated" &&
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-secondary">Date of Birth</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {profile.dob ? format(new Date(profile.dob), 'yyyy-MM-dd') : '-'}
                            </dd>
                        </div>
                    }
                    {
                        status === "authenticated" &&
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-secondary">Street Address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.address || "-"}</dd>
                        </div>
                    }
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium leading-6 text-secondary">City</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.city || "-"}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium leading-6 text-secondary">Country</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.country || "-"}</dd>
                    </div>
                    {
                        status === "authenticated" &&
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-secondary">Post Code</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.postcode || "-"}</dd>
                        </div>
                    }
                </div>
            </div>
            <div className="mt-6 mb-10">
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span className="text-xl">Links</span>
                    {
                        status === "authenticated"
                        && (session.user.role === "Owner" || session.user.role === "Admin")
                        &&

                        <MdEditSquare
                            title="Edit"
                            className="text-success text-2xl cursor-pointer"
                            onClick={() => openEdit('links')}
                        />
                    }
                </dt>
                <div className="">
                    {profile.links.map(
                        (link: Link, index: number, array: Link[]) => (
                            <div key={index} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-secondary">{index + 1}. {link.name}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <a className="link-hover" href={link.url} target="blank">{link.url}</a>
                                </dd>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span className="text-xl">Technical Skills</span>
                    <span className="text-xl">{skills.length}</span>
                </dt>
                <dd className="mt-2 text-sm text-gray-700 flex justify-start items-center flex-wrap gap-1">
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
                    <span className="text-xl">Projects</span>
                    {
                        status === "authenticated"
                        && (session.user.role === "Owner" || session.user.role === "Admin")
                        &&
                        <MdEditSquare
                            title="Edit"
                            className="text-success text-2xl cursor-pointer"
                            onClick={() => openEdit('projects')}
                        />
                    }
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
                                        <dd
                                            className="mt-2 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
                                        />
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
                    <span className="text-xl">Work Experience</span>
                    {
                        status === "authenticated"
                        && (session.user.role === "Owner" || session.user.role === "Admin")
                        &&

                        <MdEditSquare
                            title="Edit"
                            className="text-success text-2xl cursor-pointer"
                            onClick={() => openEdit('experiences')}
                        />
                    }
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
                                        <dd
                                            className="mt-2 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(experience.description) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span className="text-xl">Education</span>
                    {
                        status === "authenticated"
                        && (session.user.role === "Owner" || session.user.role === "Admin")
                        &&
                        <MdEditSquare
                            title="Edit"
                            className="text-success text-2xl cursor-pointer"
                            onClick={() => openEdit('educations')}
                        />
                    }
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
                                        <dd
                                            className="mt-2 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(education.description) }}
                                        />
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
                    <span className="text-xl">Achievements</span>
                    {
                        status === "authenticated"
                        && (session.user.role === "Owner" || session.user.role === "Admin")
                        &&
                        <MdEditSquare
                            title="Edit"
                            className="text-success text-2xl cursor-pointer"
                            onClick={() => openEdit('achievements')}
                        />
                    }
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
                                        <dd
                                            className="mt-2 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(achievement.description) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-10">
                <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                    <span className="text-xl">Interests</span>
                    {
                        status === "authenticated"
                        && (session.user.role === "Owner" || session.user.role === "Admin")
                        &&
                        <MdEditSquare
                            title="Edit"
                            className="text-success text-2xl cursor-pointer"
                            onClick={() => openEdit('interests')}
                        />
                    }
                </dt>
                <dd className="mt-2 text-sm text-gray-700 flex justify-start items-center flex-wrap gap-1">
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
                <Modal>
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
                            countries={countries}
                            close={close}
                        />
                    }
                    {
                        editSection === "experiences" &&
                        <Experiences
                            experiences={profile.experiences}
                            profile={profile}
                            countries={countries}
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
                </Modal>
            }
        </div>
    )
}