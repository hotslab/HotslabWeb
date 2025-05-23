import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Education } from '../../../../prisma/generated/client' 
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
        const { query }: NextApiRequest = req
        const id = parseInt(query.id as string, 10)
        const education: Education | null = await prisma.education.findUnique({
            where: { id: id },
            include: { profile: true }
        })
        res.status(200).json({ data: education })
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
            const id = parseInt(query.id as string, 10)
            const deletedEducation: Education = await prisma.education.delete({ where: { id: id } })
            res.status(200).json({ data: deletedEducation })
        } else res.status(401).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }
}