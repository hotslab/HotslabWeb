import { Experiences } from '@/components/Experience/Experiences';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Skill } from '@prisma/client'

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
        const { query }: NextApiRequest = req
        let selectData: { [key: string]: any } = { where: {} }
        let includeData: { [key: string]: any } = {}
        if (query.userId) selectData.where.projects = {
            every: {
                project: {
                    is: { profile: { is: { user: { is: { id: Number(query.userId) } } } } }
                }
            }
        }
        if (query.notExperienceId) selectData.where.experiences = {
            every: {
                experience: { is: { NOT: { id: Number(query.notExperienceId) } } }
            }
        }
        includeData = {
            experiences: { select: { id: true, experience: true } },
            projects: { select: { id: true, project: true } }
        }
        const skills: Skill[] = await prisma.skill.findMany({ ...selectData, include: includeData })
        res.status(200).json({ data: skills })

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
            const { body } = req
            const newSkill = await prisma.skill.create({
                data: { name: body.name },
            })
            res.status(200).json({ data: newSkill })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}
