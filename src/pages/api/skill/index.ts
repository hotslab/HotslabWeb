import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import { Skill } from '@prisma/client'
import validator from '@/lib/validator'

type Data = { data: any }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: JWT | null = await getToken({ req: req, secret: process.env.NEXT_AUTH_SECRET, raw: false })
    if (req.method === 'GET') index(req, res, session)
    else if (req.method === 'POST') create(req, res, session)
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
        let includeData: { [key: string]: any } = {}
        if (query.profileId) selectData.where.projects = {
            every: {
                project: { is: { profileId: Number(query.profileId) } }
            }
        }
        if (query.notExperienceId) selectData.where.experiences = {
            every: {
                experience: { is: { NOT: { id: Number(query.notExperienceId) } } }
            }
        }
        if (query.notProjectId) selectData.where.projects = {
            every: {
                project: { is: { NOT: { id: Number(query.notProjectId) } } }
            }
        }
        includeData = {
            experiences: { select: { id: true, experience: true } },
            projects: { select: { id: true, project: true } }
        }
        const skills: Skill[] = await prisma.skill.findMany({ ...selectData, include: includeData })
        res.status(200).json({ data: skills })

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
                name: "required|string",
            })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
                const newSkill = await prisma.skill.create({
                    data: { name: body.name },
                })
                res.status(200).json({ data: newSkill })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}
