import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma"
import { getToken, JWT } from 'next-auth/jwt'
import formidable, { File, errors as formidableErrors } from 'formidable'
import fs from "fs"
import path from 'path'
import { Profile } from '@prisma/client'
import validator from '@/lib/validator'

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
    const session: JWT | null = await getToken({ req: req, secret: process.env.NEXT_AUTH_SECRET, raw: false })
    if (req.method === 'POST') create(req, res, session)
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ data: `Method ${req.method} Not Allowed` })
    }
}

async function create(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    session: JWT | null
) {
    try {
        if (session && ["Owner", "Admin"].includes(session.user.role)) {
            const { query } = req
            const id = Number(query.id)
            const validationResponse = await validator({ id: id }, { id: "required|numeric" })
            if (validationResponse.failed) res.status(400).json({ data: validationResponse.errors })
            else {
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
                    fs.unlink(fileData.filepath, (deleteError) => {
                        if (deleteError) console.log("Temporary file delete error", deleteError)
                        console.log('Temporary file deleted!')
                    })
                    const profileData: Profile | null = await prisma.profile.findUnique({ where: { id: id } })
                    if (profileData && profileData.imageUrl) {
                        const oldImagePath = path.resolve(`./public${profileData.imageUrl}`)
                        fs.unlink(oldImagePath, (deleteError) => {
                            if (deleteError) console.log("Old file delete error", deleteError)
                            console.log('Old file deleted!')
                        })
                    }
                    await prisma.profile.update({
                        where: { id: id },
                        data: { imageUrl: `/uploads/profile/${id}/${fileData.originalFilename}` }
                    })
                    res.status(200).json({ data: { filed: fields, file: files } })
                })
            }
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ data: "Unknown Server Error" })
    }
}