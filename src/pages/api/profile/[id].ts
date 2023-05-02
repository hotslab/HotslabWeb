import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Profile } from '@prisma/client'

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
    const { query, method } = req
    const id = parseInt(query.id as string, 10)
    const profile: Profile | null = await prisma.profile.findUnique({
        where: { userId: parseInt(req.query.id as string, 10) },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    surname: true,
                    client: true,
                    roleId: true,
                    role: true,
                    active: true,
                    showProfile: true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
            experiences: true,
            educations: true,
            projects: true,
            interests: true,
            links: true,
        }
    })
    res.status(200).json({ data: profile })
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const updatedProfile = await prisma.profile.update({
            where: { id: body.data.id },
            data: {
                userId: body.data.userId,
                idNumber: body.data.idNumber,
                dob: body.data.dob,
                sex: body.data.sex,
                countryCode: body.data.countryCode,
                phoneNumber: body.data.phoneNumber,
                address: body.data.address,
                city: body.data.city,
                country: body.data.country,
                postcode: body.data.postcode,
                summary: body.data.summary,
            },
        })
        res.status(200).json({ data: updatedProfile })
    } else res.status(400).json({ data: "Unauthorized" })
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const deletedProfile = await prisma.profile.delete({ where: { id: body.data.id } })
        res.status(200).json({ data: deletedProfile })
    } else res.status(400).json({ data: "Unauthorized" })
}