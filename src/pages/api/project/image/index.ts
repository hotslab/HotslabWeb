import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth'
import { ProjectImage } from '@prisma/client'
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
    else if (req.method === 'DELETE') erase(req, res, session)
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
            const tempUploadDir = path.resolve(`./public/uploads/temp`)
            if (!fs.existsSync(tempUploadDir)) fs.mkdirSync(tempUploadDir, { recursive: true })
            const form = formidable({ multiples: true, keepExtensions: true, uploadDir: tempUploadDir })
            form.once("error", console.error)
            form.on("fileBegin", (name: any, file: any) => console.log("start uploading: ", file.name))
                .on("aborted", () => console.log("Aborted..."))
            form.once("end", () => console.log("Done!"))
            form.parse(req, async (err: any, fields, files) => {
                if (err) res.status(400).json({ data: JSON.stringify(err, null, 2) })
                const projectId = Array.isArray(fields.projectId) ? fields.projectId[0] : fields.projectId
                const projectImageId = Array.isArray(fields.projectImageId) ? fields.projectImageId[0] : fields.projectImageId
                const caption = Array.isArray(fields.caption) ? fields.caption[0] : fields.caption
                const fileData = Array.isArray(files.file) ? files.file[0] : files.file
                const profileDirectory = path.resolve(`./public/uploads/project/${projectId}/`)
                if (!fs.existsSync(profileDirectory)) fs.mkdirSync(profileDirectory, { recursive: true })
                const imagePath = path.resolve(`./public/uploads/project/${projectId}/${fileData.originalFilename}`)
                fs.renameSync(fileData.filepath, imagePath)
                const projectImage: ProjectImage = projectImageId ? await prisma.projectImage.update({
                    where: { id: Number(projectImageId) },
                    data: {
                        url: `/uploads/project/${projectId}/${fileData.originalFilename}`,
                        caption: caption
                    }
                })
                    : await prisma.projectImage.create({
                        data: {
                            projectId: Number(projectId),
                            url: `/uploads/project/${projectId}/${fileData.originalFilename}`,
                            caption: caption
                        }
                    })
                res.status(200).json({ data: { projectImage: projectImage, fields: fields, file: files } })
            })
        }
    } catch (error) {
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
            const deletedProjectImage: ProjectImage = await prisma.projectImage.delete({ where: { id: Number(query.id) } })
            res.status(200).json({ data: deletedProjectImage })
        } else res.status(400).json({ data: "Unauthorized" })
    } catch (error) {
        res.status(400).json({ data: "Unknown Server Error" })
    }
}