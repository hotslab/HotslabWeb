import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Link } from '@prisma/client'
import validator from '@/lib/validator'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: JWT | null = await getToken({ req: req, secret: process.env.NEXT_AUTH_SECRET, raw: false })
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
    session: JWT | null
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
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
            const { query, body }: NextApiRequest = req
            const validationResponse = await validator(body, {
                name: "required|string",
                url: "required|string|url",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const updatedSkill = await prisma.link.update({
                    where: { id: Number(query.id) },
                    data: { name: body.name, url: body.url },
                })
                res.status(200).json({ data: updatedSkill })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
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
            const deletedLink = await prisma.link.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedLink })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}