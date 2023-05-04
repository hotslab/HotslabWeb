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
    if (req.method === 'GET') index(req, res, session)
    else if (req.method === 'PUT') update(req, res, session)
    else if (req.method === 'DELETE') erase(req, res, session)
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    const { query, method } = req
    const id = parseInt(query.id as string, 10)
    const project = await prisma.project.findUnique({
        where: { id: id },
        include: {
            profile: true,
            skills: true,
            images: true,
            tags: true,
            experiences: true,
            clients: true,
        }
    })
    res.status(200).json({ data: project })
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
                endDate: body.data.endDate,
                description: body.data.description,
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
