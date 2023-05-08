import {
    Tag,
    Profile,
    Role,
    User,
    Client,
    Project,
    Skill,
    Link,
    Interest,
    Education,
    Achievement,
    Experience,
    ProjectSkill,
    ProjectImage,
    ProjectTag,
    ProjectExperience,
    ProjectClient
} from "@prisma/client"

declare module "@prisma/client" {
    interface UserExtended extends User {
        role: Role
        profile: Profile
    }

    interface ProfileExtended extends Profile {
        dob: string
        user: UserExtended
        achievements: Achievement[]
        links: Link[]
        projects: ProjectExtended[]
        experiences: Experience[]
        educations: Education[]
        interests: Interest[]
    }

    interface SkillExtended extends Skill {
        experiences: Experience[]
        projects: ProjectExtended[]
    }

    interface ProjectExtended extends Project {
        id?: number
        profileId?: number | null
        profile?: Profile
        startDate: Date | string
        endDate: Date | string
        skills?: ProjectSkillExtended[]
        images?: ProjectImage[]
        tags?: ProjectTagExtended[]
        experiences?: ProjectExperienceExtended[]
        clients?: ProjectClientExtended[]
        createdAt?: string
        updatedAt?: string
    }

    interface ProjectTagExtended extends ProjectTag {
        tag: Tag
        project: Project
    }

    interface ProjectClientExtended extends ProjectClient {
        client: Client
        project: Project
    }

    interface ProjectExperienceExtended extends ProjectExperience {
        experience: Experience
        project: Project
    }

    interface ProjectSkillExtended extends ProjectSkill {
        project: Project,
        skill: Skill
    }
}