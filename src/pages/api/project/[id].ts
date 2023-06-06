import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Project } from '@prisma/client'
import validator from '@/lib/validator'
import nextCors from '@/lib/cors'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await nextCors(req, res)
    const session: JWT | null = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET, raw: false })
    if (req.method === 'GET') await index(req, res, session)
    else if (req.method === 'PUT') await update(req, res, session)
    else if (req.method === 'DELETE') await erase(req, res, session)
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        const { query } = req
        const project: Project | null = await prisma.project.findUnique({
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
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
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
            const deletedProject = await prisma.project.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedProject })
        } else res.status(401).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }
}
