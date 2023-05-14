import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Link } from '@prisma/client'

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
        const link: Link | null = await prisma.link.findUnique({
            where: { id: id },
            include: { profile: true }
        })
        res.status(200).json({ data: link })
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
            const updatedSkill = await prisma.link.update({
                where: { id: id },
                data: { name: body.name, url: body.url },
            })
            res.status(200).json({ data: updatedSkill })
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
            const deletedLink = await prisma.link.delete({ where: { id: id } })
            res.status(200).json({ data: deletedLink })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}