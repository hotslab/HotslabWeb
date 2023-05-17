import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Education } from '@prisma/client'
import validator from '@/lib/validator'


type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
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
        const { query }: NextApiRequest = req
        const id = parseInt(query.id as string, 10)
        const education: Education | null = await prisma.education.findUnique({
            where: { id: id },
            include: { profile: true }
        })
        res.status(200).json({ data: education })
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
            const { query, body }: NextApiRequest = req
            const validationResponse = await validator(body, {
                title: "required|string",
                school: "required|string",
                location: "required|string",
                description: "required|string",
                startDate: "required|date",
                endDate: "required|date",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const updatedEducation: Education = await prisma.education.update({
                    where: { id: Number(query.id) },
                    data: {
                        title: body.title,
                        school: body.school,
                        location: body.location,
                        description: body.description,
                        startDate: body.startDate,
                        endDate: body.endDate,
                    },
                })
                res.status(200).json({ data: updatedEducation })
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
            const id = parseInt(query.id as string, 10)
            const deletedEducation: Education = await prisma.education.delete({ where: { id: id } })
            res.status(200).json({ data: deletedEducation })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}