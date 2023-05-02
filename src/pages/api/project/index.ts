import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Project } from '@prisma/client'

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
    const portfolios: Project[] = await prisma.project.findMany()
    res.status(200).json({ data: portfolios })
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const newProject = await prisma.project.create({
            data: {
                profileId: body.data.profileId,
                projectName: body.data.projectName,
                isOngoing: body.data.isOngoing,
                startDate: body.data.startDate,
                enddDate: body.data.enddDate,
                Description: body.data.Description,
                experienceId: body.data.experienceId,
                orderNumber: body.data.orderNumber,
            },
        })
        res.status(200).json({ data: newProject })
    } else throw new Error("Unauthorized")
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const updatedProject = await prisma.project.update({
            where: { id: body.data.id },
            data: {
                profileId: body.data.profileId,
                projectName: body.data.projectName,
                isOngoing: body.data.isOngoing,
                startDate: body.data.startDate,
                enddDate: body.data.enddDate,
                Description: body.data.Description,
                experienceId: body.data.experienceId,
                orderNumber: body.data.orderNumber,
            },
        })
        res.status(200).json({ data: updatedProject })
    } else throw new Error("Unauthorized")
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const deletedProject = await prisma.project.delete({ where: { id: body.data.id } })
        res.status(200).json({ data: deletedProject })
    } else throw new Error("Unauthorized")
}
