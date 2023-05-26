import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Achievement } from '@prisma/client'
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
        const { query }: NextApiRequest = req
        const id = parseInt(query.id as string, 10)
        const achievement: Achievement | null = await prisma.achievement.findUnique({
            where: { id: id },
            include: { profile: true }
        })
        res.status(200).json({ data: achievement })
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
            const { query, body }: NextApiRequest = req
            const validationResponse = await validator(body, {
                name: "required|string",
                description: "required|string",
                profileId: "required|numeric"
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const updatedAchievement: Achievement = await prisma.achievement.update({
                    where: { id: Number(query.id) },
                    data: {
                        name: body.name,
                        description: body.description,
                    },
                })
                res.status(200).json({ data: updatedAchievement })
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
            const deletedAchievement: Achievement = await prisma.achievement.delete({ where: { id: id } })
            res.status(200).json({ data: deletedAchievement })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}