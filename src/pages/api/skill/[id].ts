import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Skill, SkillExtended } from '@prisma/client'

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
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function index(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    const { query, method }: NextApiRequest = req
    const id = parseInt(query.id as string, 10)
    const skill = await prisma.skill.findUnique({
        where: { id: id },
        include: {
            experiences: { include: { experience: true } },
            projects: { include: { project: true } }
        }
    })
    res.status(200).json({ data: skill })
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const updatedSkill = await prisma.skill.update({
            where: { id: body.data.id },
            data: { name: body.data.name },
        })
        res.status(200).json({ data: updatedSkill })
    } else throw new Error("Unauthorized")
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const deletedSkill = await prisma.skill.delete({ where: { id: body.data.id } })
        res.status(200).json({ data: deletedSkill })
    } else throw new Error("Unauthorized")
}