import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Role } from '@prisma/client'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: Session | null = await getServerSession(req, res, {})
    if (req.method === 'GET') index(req, res, session)
    else if (req.method === 'POST') create(req, res, session)
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
    const { query, method, body }: NextApiRequest = req
    let selectData: { [key: string]: any } = { where: {} }
    let includeData: { [key: string]: any } = {
        users: true
    }

    selectData.where = {
        active: true
    }
    const roles: Role[] = await prisma.role.findMany({ ...selectData, include: includeData })
    res.status(200).json({ data: roles })
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const { body }: NextApiRequest = req
        const newRole = await prisma.role.create({
            data: { name: body.data.name, active: body.data.active },
        })
        res.status(200).json({ data: newRole })
    } else throw new Error("Unauthorized")
}
