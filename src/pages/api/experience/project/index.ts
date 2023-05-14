import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { ProjectExperience } from '@prisma/client'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: Session | null = await getServerSession(req, res, {})
    if (req.method === 'POST') create(req, res, session)
    else if (req.method === 'DELETE') erase(req, res, session)
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
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
            const exists = await prisma.projectExperience.findMany({
                where: {
                    experienceId: body.experienceId,
                    projectId: body.projectId
                }
            })
            if (exists.length === 0) {
                const projectExperience: ProjectExperience = await prisma.projectExperience.create({
                    data: {
                        experienceId: body.experienceId,
                        projectId: body.projectId
                    },
                })
                res.status(200).json({ data: projectExperience })

            } else res.status(400).json({ data: "Project is already linked to experience" })
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
            const projectExperience: ProjectExperience = await prisma.projectExperience.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: projectExperience })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}