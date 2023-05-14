import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as argon2 from "argon2"
import { Session } from 'next-auth'
import { User } from '@prisma/client'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const session: Session | null = await getServerSession(req, res, {})
        if (req.method === 'GET') index(req, res, session)
        else if (req.method === 'POST') create(req, res, session)
        else {
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    const users: User[] = await prisma.user.findMany()
    res.status(200).json({ data: users })
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
            const { email, name, surname, password, showProfile, roleId } = req.body.data
            const exists = await prisma.user.findUnique({ where: { email } })
            if (exists) res.status(400).json({ data: "User already exists" })
            else {
                const newUser = await prisma.user.create({
                    data: {
                        email: email,
                        name: name,
                        surname: surname,
                        password: await argon2.hash(password),
                        showProfile: showProfile,
                        roleId: roleId
                    },
                })
                res.status(200).json({ data: newUser })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }

}
