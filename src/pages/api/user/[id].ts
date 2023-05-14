import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { User } from '@prisma/client'
import * as argon2 from "argon2"

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
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        const { query, method } = req
        const id = parseInt(query.id as string, 10)
        const user: User | null = await prisma.user.findUnique({
            where: { id: parseInt(req.query.id as string, 10) },
            include: {
                profile: true,
                role: true
            }
        })
        res.status(200).json({ data: user })
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
            const { body } = req
            const { id, email, name, surname, password, showProfile, roleId } = body
            const userExists: User[] = await prisma.user.findMany({
                where: {
                    AND: [
                        { email: email },
                        { id: { not: id } }
                    ]
                }
            })
            if (userExists.length > 0) res.status(400).json({ data: "This email already belongs to another user" })
            let data: { [key: string]: any } = {
                email: email,
                name: name,
                surname: surname,
                showProfile: showProfile,
                roleId: roleId
            }
            if (password) data.password = await argon2.hash(password)
            const updatedUser = await prisma.user.update({ where: { id: id }, data: data })
            res.status(200).json({ data: updatedUser })
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
    if (session) {
        const body = JSON.parse(req.body)
        const deletedUser = await prisma.user.delete({ where: { id: body.data.id } })
        res.status(200).json({ data: deletedUser })
    } else throw new Error("Unauthorized")
}