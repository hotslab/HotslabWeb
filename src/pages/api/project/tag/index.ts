import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { ProjectTag } from '@prisma/client'
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
                tagId: "required|numeric",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const exists = await prisma.projectTag.findMany({
                    where: {
                        projectId: body.projectId,
                        tagId: body.tagId
                    }
                })
                if (exists.length === 0) {
                    const newProjectTag: ProjectTag = await prisma.projectTag.create({
                        data: {
                            projectId: body.projectId,
                            tagId: body.tagId
                        },
                    })
                    res.status(200).json({ data: newProjectTag })
                } else res.status(400).json({ data: "Tag is already linked to project" })
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
            const deletedProjectTag: ProjectTag = await prisma.projectTag.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedProjectTag })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}