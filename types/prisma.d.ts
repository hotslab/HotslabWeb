import {
    Profile,
    Role,
    User,
    Project,
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
        user: User
    }

    interface ProjectExtended extends Project {
        id?: number
        profileId?: number | null
        profile?: Profile
        startDate: Date | string
        enddDate: Date | string
        skills?: ProjectSkill[]
        images?: ProjectImage[]
        tags?: ProjectTag[]
        experiences?: ProjectExperience[]
        clients?: ProjectClient[]
        createdAt?: string
        updatedAt?: string
    }
}