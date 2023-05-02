import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Education } from '@prisma/client'

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
    const educations: Education[] = await prisma.education.findMany()
    res.status(200).json({ data: educations })
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const newEducation = await prisma.education.create({
            data: {
                profileId: body.data.profileId,
                school: body.data.school,
                degree: body.data.degree,
                description: body.data.description,
                startDate: body.data.startDate,
                enddDate: body.data.enddDate,
                orderNumber: body.data.orderNumber,
            },
        })
        res.status(200).json({ data: newEducation })
    } else throw new Error("Unauthorized")
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const updatedEducation = await prisma.education.update({
            where: { id: body.data.id },
            data: {
                profileId: body.data.profileId,
                school: body.data.school,
                degree: body.data.degree,
                description: body.data.description,
                startDate: body.data.startDate,
                enddDate: body.data.enddDate,
                orderNumber: body.data.orderNumber,
            },
        })
        res.status(200).json({ data: updatedEducation })
    } else throw new Error("Unauthorized")
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const deletedEducation = await prisma.education.delete({ where: { id: body.data.id } })
        res.status(200).json({ data: deletedEducation })
    } else throw new Error("Unauthorized")
}
