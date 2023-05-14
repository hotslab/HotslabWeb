import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { Profile } from '@prisma/client'
import formidable, { File, errors as formidableErrors } from 'formidable'
import fs from "fs"
import path from 'path'

type Data = { data: any }

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session: Session | null = await getServerSession(req, res, {})
    if (req.method === 'POST') create(req, res, session)
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: Session | null
) {
    try {
        if (session) {
            const { query } = req
            const id = parseInt(query.id as string, 10)
            const tempUploadDir = path.resolve(`./public/uploads/temp`)
            if (!fs.existsSync(tempUploadDir)) fs.mkdirSync(tempUploadDir, { recursive: true })
            const form = formidable({ multiples: true, keepExtensions: true, uploadDir: tempUploadDir })
            form.once("error", console.error)
            form.on("fileBegin", (name: any, file: any) => console.log("start uploading: ", file.name))
                .on("aborted", () => console.log("Aborted..."))
            form.once("end", () => console.log("Done!"))
            form.parse(req, async (err: any, fields: any, files) => {
                if (err) res.status(400).json({ data: JSON.stringify(err, null, 2) })
                const profileDirectory = path.resolve(`./public/uploads/profile/${id}/`)
                if (!fs.existsSync(profileDirectory)) fs.mkdirSync(profileDirectory, { recursive: true })
                const fileData = Array.isArray(files.file) ? files.file[0] : files.file
                const imagePath = path.resolve(`./public/uploads/profile/${id}/${fileData.originalFilename}`)
                console.log("moving file: ", fileData.filepath, " to ", imagePath)
                fs.renameSync(fileData.filepath, imagePath)
                await prisma.profile.update({
                    where: { id: id },
                    data: { imageUrl: `/uploads/profile/${id}/${fileData.originalFilename}` }
                })
                res.status(200).json({ data: { filed: fields, file: files } })
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}