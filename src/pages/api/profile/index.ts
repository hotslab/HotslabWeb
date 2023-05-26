import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Profile } from '@prisma/client'
import validator from '@/lib/validator'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
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
        const { query }: NextApiRequest = req
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
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
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
                idNumber: "required|string",
                dob: "required|date",
                sex: "required|string",
                countryCode: "required|string",
                phoneNumber: "required|numeric",
                address: "required|string",
                city: "required|string",
                country: "required|string",
                postcode: "required|string",
                summary: "required|string",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const newProfile = await prisma.profile.create({
                    data: {
                        userId: body.userId,
                        idNumber: body.idNumber,
                        dob: body.dob,
                        sex: body.sex,
                        countryCode: body.countryCode,
                        phoneNumber: body.phoneNumber,
                        address: body.address,
                        city: body.city,
                        country: body.country,
                        postcode: body.postcode,
                        summary: body.summary,
                    },
                })
                res.status(200).json({ data: newProfile })
            }
        } else throw new Error("Unauthorized")
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}
