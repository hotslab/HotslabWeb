import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Experience } from '@prisma/client'
import validator from '@/lib/validator'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
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
        const id = parseInt(query.id as string, 10)
        const experience: Experience | null = await prisma.experience.findUnique({
            where: { id: id },
            include: {
                profile: true,
                skills: { select: { skill: true } },
                projects: { select: { project: true } },
            }
        })
        res.status(200).json({ data: experience })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}


async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
            const { query, body } = req
            const validationResponse = await validator(body, {
                profileId: "required|numeric",
                title: "required|string",
                employmentType: "required|string",
                companyName: "required|string",
                location: "required|string",
                locationType: "required|string",
                isCurrentPosition: "required|boolean",
                startDate: "required|date",
                endDate: "required|date",
                industry: "required|string",
                description: "required|string",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const updatedExperience = await prisma.experience.update({
                    where: { id: Number(query.id) },
                    data: {
                        profileId: body.profileId,
                        title: body.title,
                        employmentType: body.employmentType,
                        companyName: body.companyName,
                        location: body.location,
                        locationType: body.locationType,
                        isCurrentPosition: body.isCurrentPosition,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        industry: body.industry,
                        description: body.description,
                    },
                })
                res.status(200).json({ data: updatedExperience })
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
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
            const { query } = req
            const id = parseInt(query.id as string, 10)
            const deletedExperience = await prisma.experience.delete({ where: { id: id } })
            res.status(200).json({ data: deletedExperience })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}