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
    else if (req.method === 'POST') await create(req, res, session)
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
            profile: true
        }
        const achievements: Achievement[] = await prisma.achievement.findMany({ ...selectData, include: includeData })
        res.status(200).json({ data: achievements })
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
                name: "required|string",
                description: "required|string",
                profileId: "required|numeric"
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const newAchievement: Achievement = await prisma.achievement.create({
                    data: { name: body.name, description: body.description, profileId: body.profileId }
                })
                res.status(200).json({ data: newAchievement })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}
