import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Profile } from '../../../../prisma/generated/client'
import "dotenv/config"
import nextCors from '@/lib/cors'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await nextCors(req, res)
    const session: JWT | null = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET, raw: false })
    if (req.method === 'GET') await index(req, res, session)
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        const { query } = req
        const profile: Profile | null = await prisma.profile.findFirst({
            where: { user: { email: process.env.NEXT_PUBLIC_OWNER_EMAIL } }
            ,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        surname: true,
                        client: true,
                        roleId: true,
                        role: true,
                        active: true,
                        showProfile: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                experiences: {
                    select: {
                        id: true,
                        profileId: true,
                        title: true,
                        employmentType: true,
                        companyName: true,
                        location: true,
                        locationType: true,
                        isCurrentPosition: true,
                        startDate: true,
                        endDate: true,
                        industry: true,
                        description: true,
                        skills: { select: { id: true, skill: true } },
                        projects: { select: { id: true, project: true } }
                    }
                },
                educations: true,
                achievements: true,
                projects: {
                    select: {
                        id: true,
                        projectName: true,
                        isOngoing: true,
                        startDate: true,
                        endDate: true,
                        description: true,
                        clients: { select: { id: true, client: true } },
                        experiences: { select: { id: true, experience: true } },
                        skills: { select: { id: true, skill: true } },
                        tags: { select: { id: true, tag: true } },
                        images: true
                    }
                },
                interests: true,
                links: true,
            }
        })
        res.status(200).json({ data: profile })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }
}
