import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { ProjectExperience } from '@prisma/client'
import validator from '@/lib/validator'

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
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
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
                projectId: "required|numeric",
                experienceId: "required|numeric",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const exists = await prisma.projectExperience.findMany({
                    where: {
                        projectId: body.projectId,
                        experienceId: body.experienceId
                    }
                })
                if (exists.length === 0) {
                    const newProjectExperience: ProjectExperience = await prisma.projectExperience.create({
                        data: {
                            projectId: body.projectId,
                            experienceId: body.experienceId
                        },
                    })
                    res.status(200).json({ data: newProjectExperience })
                } else res.status(400).json({ data: "Experience is already linked to project" })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
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
            const deletedProjectExperience: ProjectExperience = await prisma.projectExperience.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedProjectExperience })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}