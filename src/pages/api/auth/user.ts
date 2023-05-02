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
    // const body = JSON.parse(req.body);
    const session: Session | null = await getServerSession(req, res, {})
    switch (req.method) {
        case 'POST':
            create(req, res, session)
        case 'PUT':
            update(req, res, session)
        case 'DELETE':
            erase(req, res, session)
        default:
            index(req, res, session)
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
    if (session) {
        const { email, name, surname, password, role, } = req.body.data
        const exists = await prisma.user.findUnique({ where: { email } })
        if (exists) throw new Error("User already exists")
        else {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    surname: surname,
                    password: await argon2.hash(password),
                    role: role
                },
            })
            res.status(200).json({ data: newUser })
        }
    } else throw new Error("Unauthorized")
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        // const body = JSON.parse(req.body)
        const { id, email, name, surname, password, role, } = req.body.data
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                email: email,
                name: name,
                surname: surname,
                password: await argon2.hash(password),
                role: role
            },
        })
        res.status(200).json({ data: updatedUser })
    } else throw new Error("Unauthorized")
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
