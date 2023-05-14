import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Achievement } from '@prisma/client'

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
        res.status(405).end(`Method ${req.method} Not Allowed`)
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
        const achievement: Achievement | null = await prisma.achievement.findUnique({
            where: { id: id },
            include: { profile: true }
        })
        res.status(200).json({ data: achievement })
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
            const id = parseInt(query.id as string, 10)
            const updatedAchievement: Achievement = await prisma.achievement.update({
                where: { id: id },
                data: {
                    name: body.name,
                    description: body.description,
                },
            })
            res.status(200).json({ data: updatedAchievement })
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
            const deletedAchievement: Achievement = await prisma.achievement.delete({ where: { id: id } })
            res.status(200).json({ data: deletedAchievement })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}