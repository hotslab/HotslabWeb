import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import * as argon2 from "argon2"
import { getToken, JWT } from 'next-auth/jwt'
import { User } from '../../../../prisma/generated/client'
import validator from "@/lib/validator"
import nextCors from "@/lib/cors"

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await nextCors(req, res)
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
        const users: User[] = await prisma.user.findMany({ where: { active: true } })
        res.status(200).json({ data: users })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
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
                email: "required|string|email",
                name: "required|string",
                surname: "required|string",
                showProfile: "required|boolean",
                roleId: "required|numeric",
                password: "required|alpha_num|min:8"
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const exists = await prisma.user.findUnique({ where: { email: body.email } })
                if (exists) res.status(400).json({ data: "User already exists" })
                else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: body.email,
                            name: body.name,
                            surname: body.surname,
                            showProfile: body.showProfile,
                            roleId: body.roleId,
                            password: await argon2.hash(body.password),
                        },
                    })
                    res.status(200).json({ data: newUser })
                }
            }
        } else res.status(401).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Internal Server Error" })
    }

}
