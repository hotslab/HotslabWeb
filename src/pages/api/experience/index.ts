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
    session: JWT | null
) {
    try {
        const { query }: NextApiRequest = req
        let selectData: { [key: string]: any } = { where: {} }
        let includeData: { [key: string]: any } = {
            profile: true,
            skills: { select: { id: true, skill: true } },
            projects: { select: { id: true, project: true } }
        }
        if (query.notProjectId) selectData.where.projects = {
            every: {
                project: { is: { NOT: { id: Number(query.notProjectId) } } }
            }
        }
        const experiences: Experience[] = await prisma.experience.findMany({
            ...selectData,
            include: includeData
        })
        res.status(200).json({ data: experiences })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
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
                const newExperience = await prisma.experience.create({
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
                res.status(200).json({ data: newExperience })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}
