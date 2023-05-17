import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Profile } from '@prisma/client'
import validator from '@/lib/validator'

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
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        const { query } = req
        const profile: Profile | null = await prisma.profile.findUnique({
            where: { id: Number(query.id) },
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
                experiences: {
                    select: {
                        id: true,
                        profileId: true,
                        title: true,
                        employmentType: true,
                        companyName: true,
                        location: true,
                        locationType: true,
                        isCurrentPosition: true,
                        startDate: true,
                        endDate: true,
                        industry: true,
                        description: true,
                        skills: { select: { id: true, skill: true } },
                        projects: { select: { id: true, project: true } }
                    }
                },
                educations: true,
                achievements: true,
                projects: {
                    select: {
                        id: true,
                        projectName: true,
                        isOngoing: true,
                        startDate: true,
                        endDate: true,
                        description: true,
                        clients: { select: { id: true, client: true } },
                        experiences: { select: { id: true, experience: true } },
                        skills: { select: { id: true, skill: true } },
                        tags: { select: { id: true, tag: true } },
                        images: true
                    }
                },
                interests: true,
                links: true,
            }
        })
        res.status(200).json({ data: profile })
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
            const { query, body } = req
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
                const updatedProfile = await prisma.profile.update({
                    where: { id: Number(query.id) },
                    data: {
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
                res.status(200).json({ data: updatedProfile })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
            const { query } = req
            const deletedProfile = await prisma.profile.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedProfile })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}