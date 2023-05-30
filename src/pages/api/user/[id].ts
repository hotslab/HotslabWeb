import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { User } from '@prisma/client'
import * as argon2 from "argon2"
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
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        const { query } = req
        const user: User | null = await prisma.user.findUnique({
            where: { id: Number(query.id) },
            include: {
                profile: true,
                role: true
            }
        })
        res.status(200).json({ data: user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }
}


async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
            const { query, body } = req
            body.password = body.password.trim()
            const validationResponse = await validator(body, {
                email: "required|string|email",
                name: "required|string",
                surname: "required|string",
                showProfile: "required|boolean",
                roleId: "required|numeric",
                password: "alpha_num|min:8"
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const userExists: User[] = await prisma.user.findMany({
                    where: {
                        AND: [
                            { email: body.email },
                            { id: { not: Number(query.id) } }
                        ]
                    }
                })
                if (userExists.length > 0) {
                    res.status(400).json({ data: "This email already belongs to another user" })
                } else {
                    let data: { [key: string]: any } = {
                        email: body.email,
                        name: body.name,
                        surname: body.surname,
                        showProfile: body.showProfile,
                        roleId: body.roleId
                    }
                    if (body.password) data.password = await argon2.hash(body.password)
                    const updatedUser = await prisma.user.update({ where: { id: Number(query.id) }, data: data })
                    res.status(200).json({ data: updatedUser })
                }
            }
        } else res.status(401).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
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
            const deletedUser = await prisma.user.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedUser })
        } else throw new Error("Unauthorized")
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }
}