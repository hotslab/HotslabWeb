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
    ProjectClient,
    ExperienceSkill
} from "@prisma/client"

declare module "@prisma/client" {
    interface RoleExtended extends Role {
        users: User[]
    }

    interface UserExtended extends User {
        role: Role
        profile?: Profile
        client?: Client
    }

    interface ProfileExtended extends Profile {
        dob: string
        user: UserExtended
        achievements: Achievement[]
        links: Link[]
        projects: ProjectExtended[]
        experiences: ExperienceExtended[]
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

    interface ExperienceExtended extends Experience {
        projects: ProjectExperienceExtended[]
        skills: ExperienceSkillExtended[]
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

    interface ExperienceSkillExtended extends ExperienceSkill {
        experience: Experience
        skill: Skill
    }
}