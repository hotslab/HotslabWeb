import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Role } from '@prisma/client'
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
        const role: Role | null = await prisma.role.findUnique({
            where: { id: id },
            include: { users: true }
        })
        res.status(200).json({ data: role })
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
                active: "required|boolean",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const updatedRole = await prisma.role.update({
                    where: { id: Number(query.id) },
                    data: { name: body.name, active: body.active },
                })
                res.status(200).json({ data: updatedRole })
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
            const deletedRole = await prisma.role.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedRole })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}