import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { ProjectExperience } from '@prisma/client'
import validator from '@/lib/validator'
import nextCors from '@/lib/cors'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await nextCors(req, res)
    const session: JWT | null = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET, raw: false })
    if (req.method === 'POST') await create(req, res, session)
    else if (req.method === 'DELETE') await erase(req, res, session)
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
                experienceId: "required|numeric",
                projectId: "required|numeric",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
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
            }
        } else res.status(401).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
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
            const projectExperience: ProjectExperience = await prisma.projectExperience.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: projectExperience })
        } else res.status(401).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }
}