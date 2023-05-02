import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Client } from '@prisma/client'

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
    const clients: Client[] = await prisma.client.findMany()
    res.status(200).json({ data: clients })
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const newClient = await prisma.client.create({
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
            },
        })
        res.status(200).json({ data: newClient })
    } else throw new Error("Unauthorized")
}

async function update(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const updatedClient = await prisma.client.update({
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
            },
        })
        res.status(200).json({ data: updatedClient })
    } else throw new Error("Unauthorized")
}

async function erase(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    if (session) {
        const body = JSON.parse(req.body)
        const deletedClient = await prisma.client.delete({ where: { id: body.data.id } })
        res.status(200).json({ data: deletedClient })
    } else throw new Error("Unauthorized")
}
