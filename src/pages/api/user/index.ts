import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as argon2 from "argon2"
import { Session } from 'next-auth'
import { User } from '@prisma/client'
import validator from "@/lib/validator"

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
            res.status(405).json({ data: `Method ${req.method} Not Allowed` })
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
    const users: User[] = await prisma.user.findMany({ where: { active: true } })
    res.status(200).json({ data: users })
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
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
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }

}
