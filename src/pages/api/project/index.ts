import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Project } from '@prisma/client'

type Data = { data: any }
// type Select = 

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: Session | null = await getServerSession(req, res, {})
    if (req.method === 'GET') index(req, res, session)
    else if (req.method === 'POST') create(req, res, session)
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
    const { query, method }: NextApiRequest = req
    let select: { [key: string]: any } = { where: {} }
    let selectData: { [key: string]: any } = { where: {} }
    let includeData: { [key: string]: any } = {
        profile: true,
        skills: { select: { id: true, skill: true } },
        images: true,
        tags: { select: { id: true, tag: true } },
        experiences: { select: { id: true, experience: true } },
        clients: { select: { id: true, client: true } },
    }
    if (query.tags) selectData.where.tags = {
        every: {
            tag: { is: { OR: ((query as any).tags.split(",")).map((tag: string) => { return { name: tag } }) } }
        }
    }
    const projects: Project[] = await prisma.project.findMany({
        ...selectData,
        include: includeData
    })
    res.status(200).json({ data: projects })
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
                endDate: body.data.endDate,
                description: body.data.Description,
            },
        })
        res.status(200).json({ data: newProject })
    } else throw new Error("Unauthorized")
}