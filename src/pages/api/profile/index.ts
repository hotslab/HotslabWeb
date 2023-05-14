import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
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
    try {
        const { query, method }: NextApiRequest = req
        let selectData: { [key: string]: any } = { where: {} }
        let includeData: { [key: string]: any } = {
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
        selectData.where.user = { active: true }
        const profiles: Profile[] = await prisma.profile.findMany({
            ...selectData,
            include: includeData
        })
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ data: profiles })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
            const body = JSON.parse(req.body)
            const newProfile = await prisma.profile.create({
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
            res.status(200).json({ data: newProfile })
        } else throw new Error("Unauthorized")
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}
