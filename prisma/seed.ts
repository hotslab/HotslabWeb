import { PrismaClient, Prisma } from '@prisma/client'
import * as argon2 from "argon2"

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    // ROLES 
    const roles = [
        { name: 'Owner', active: true },
        { name: 'Client', active: true },
        { name: 'Admin', active: true },
    ]
    for (const role of roles) await prisma.role.upsert({ where: { name: role.name }, update: {}, create: role })

    // USER
    await prisma.user.upsert({
        where: { email: 'joseph.nyahuye@gmail.com' },
        update: {},
        create: {
            email: 'joseph.nyahuye@gmail.com',
            name: 'Joseph',
            surname: 'Nyahuye',
            active: true,
            showProfile: true,
            role: { connect: { id: (await prisma.role.findUnique({ where: { name: 'Owner', }, }))?.id } },
            password: await argon2.hash("joseph"),
            profile: {
                create: {
                    dob: new Date(),
                    sex: "male",
                    countryCode: 263,
                    phoneNumber: 779101562,
                    address: "Mabelreign",
                    city: "Harare",
                    country: "Zimbabwe",
                    postcode: '0000',
                    summary: `A well seasoned and experienced full stack software developer, with over 5 years 
                    of commercial working experience in the industry.`,
                }
            }
        }
    })

    // TAGS
    const tags = [
        { name: 'project' },
        { name: 'portfolio' },
        { name: 'design' }
    ]

    for (const tag of tags) await prisma.tag.upsert({ where: { name: tag.name }, update: {}, create: tag })

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })