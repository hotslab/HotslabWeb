import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Project } from '@prisma/client'
import validator from '@/lib/validator'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: Session | null = await getServerSession(req, res, {})
    if (req.method === 'GET') index(req, res, session)
    else if (req.method === 'POST') create(req, res, session)
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        const { query, method }: NextApiRequest = req
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
        if (query.notExperienceId) selectData.where.experiences = {
            every: {
                experience: { is: { NOT: { id: Number(query.notExperienceId) } } }
            }
        }
        const projects: Project[] = await prisma.project.findMany({
            ...selectData,
            include: includeData
        })
        res.status(200).json({ data: projects })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
            const { body } = req
            const validationResponse = await validator(body, {
                profileId: "required|numeric",
                projectName: "required|string",
                isOngoing: "required|boolean",
                startDate: "required|date",
                endDate: "required|date",
                description: "required|string",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const newProject = await prisma.project.create({
                    data: {
                        profileId: body.profileId,
                        projectName: body.projectName,
                        isOngoing: body.isOngoing,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        description: body.description,
                    },
                })
                res.status(200).json({ data: newProject })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}