import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Experience } from '@prisma/client'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // const body = JSON.parse(req.body);
    const session: Session | null = await getServerSession(req, res, {})
    switch (req.method) {
        case 'POST':
            create(req, res, session)
        case 'PUT':
            update(req, res, session)
        case 'DELETE':
            erase(req, res, session)
        default:
            index(req, res, session)
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    const experiences: Experience[] = await prisma.experience.findMany()
    res.status(200).json({ data: experiences })
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const newExperience = await prisma.experience.create({
            data: {
                profileId: body.data.profileId,
                title: body.data.title,
                employmentType: body.data.employmentType,
                companyName: body.data.companyName,
                location: body.data.location,
                locationType: body.data.locationType,
                isCurrentPosition: body.data.isCurrentPosition,
                startDate: body.data.startDate,
                endDate: body.data.endDate,
                industry: body.data.industry,
                description: body.data.description,
            },
        })
        res.status(200).json({ data: newExperience })
    } else throw new Error("Unauthorized")
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const updatedExperience = await prisma.experience.update({
            where: { id: body.data.id },
            data: {
                profileId: body.data.profileId,
                title: body.data.title,
                employmentType: body.data.employmentType,
                companyName: body.data.companyName,
                location: body.data.location,
                locationType: body.data.locationType,
                isCurrentPosition: body.data.isCurrentPosition,
                startDate: body.data.startDate,
                endDate: body.data.endDate,
                industry: body.data.industry,
                description: body.data.description,
            },
        })
        res.status(200).json({ data: updatedExperience })
    } else throw new Error("Unauthorized")
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const deletedExperience = await prisma.experience.delete({ where: { id: body.data.id } })
        res.status(200).json({ data: deletedExperience })
    } else throw new Error("Unauthorized")
}
