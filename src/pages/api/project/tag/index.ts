import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { ProjectTag } from '@prisma/client'
import validator from '@/lib/validator'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: JWT | null = await getToken({ req: req, secret: process.env.NEXT_AUTH_SECRET, raw: false })
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
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
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
        res.status(400).json({ data: "Unknown Server Error" })
    }
}


async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
            const { query } = req
            const deletedProjectTag: ProjectTag = await prisma.projectTag.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedProjectTag })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}