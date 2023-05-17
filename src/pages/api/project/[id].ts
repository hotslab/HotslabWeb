import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Project } from '@prisma/client'
import validator from '@/lib/validator'

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
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        const { query } = req
        const project = await prisma.project.findUnique({
            where: { id: Number(query.id) },
            include: {
                profile: true,
                skills: { include: { skill: true } },
                images: true,
                tags: { include: { tag: true } },
                experiences: { include: { experience: true } },
                clients: { include: { client: true } },
            }
        })
        res.status(200).json({ data: project })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
            const { body, query } = req
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
                const updatedProject = await prisma.project.update({
                    where: { id: Number(query.id) },
                    data: {
                        profileId: body.profileId,
                        projectName: body.projectName,
                        isOngoing: body.isOngoing,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        description: body.description,
                    },
                })
                res.status(200).json({ data: updatedProject })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
            const { query } = req
            const deletedProject = await prisma.project.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedProject })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}
