require('dotenv/config')
const { PrismaClient } = require('./generated/client')
const argon2 = require("argon2")
const fs = require("fs")
const path = require("path")
const { countries, skills, roles, tags, experiences, educations, projectImages } = require('./datasets.js')

const prisma = new PrismaClient()

async function populateSkills(skillList) {
    const skills = await prisma.skill.findMany({ where: { OR: skillList.map((skill) => { return { name: skill } }) } })
    return skills.length > 0 ? skills.map((skill) => skill.id) : []
}

async function main() {
    console.log(`Start seeding ...`)

    // ROLES 
    for (const role of roles) await prisma.role.upsert({ where: { name: role.name }, update: {}, create: role })

    // USER
    await prisma.user.upsert({
        where: { email: process.env.NEXT_PUBLIC_OWNER_EMAIL },
        update: {},
        create: {
            email: process.env.NEXT_PUBLIC_OWNER_EMAIL,
            name: 'Joseph',
            surname: 'Nyahuye',
            active: true,
            showProfile: true,
            role: { connect: { id: (await prisma.role.findUnique({ where: { name: 'Owner', }, }))?.id } },
            password: await argon2.hash(process.env.NEXT_PUBLIC_OWNER_PASSWORD),
            profile: {
                create: {
                    dob: new Date('1989-03-07').toISOString(),
                    sex: "male",
                    countryCode: "+263",
                    phoneNumber: 779101562,
                    address: "Mabelreign",
                    city: "Harare",
                    country: "Zimbabwe",
                    postcode: '0000',
                    summary: `
                    <p>1. Over 6 years of full stack software development experience, developing and implementing applications based on client&rsquo;s needs.<br>2. Experienced in working on UNIX systems and developing databases.<br>3. Excellent in troubleshooting skills with an ability to engineer well researched, responsive solutions after analysing codes.<br>4. Possess knowledge of processes and tools to design state of the art software solutions based on relevant software and tools in both the back and frontend.</p>
                    `,
                    links: {
                        create: [
                            { name: "Linkedin Profile", url: "https://linkedin.com/in/joseph-nyahuye-4a9b94150 /" },
                            { name: "StackOverflow Profile", url: "https://stackoverflow.com/users/17287276/joseph-nyahuye?tab=profile" },
                            { name: "Gitlab Profile", url: "https://gitlab.com/Hotslab" },
                            { name: "Github Profile", url: "https://github.com/hotslab" },
                            { name: "Portfolio Website", url: "https://hotslab.com" },
                        ]
                    },
                    interests: {
                        create: [
                            { name: "Technology" },
                            { name: "Art" },
                            { name: "Music" },
                            { name: "Video Games" },
                            { name: "Movies" },
                            { name: "TV Series" },
                            { name: "Fitness" }
                        ]
                    },
                    achievements: {
                        create: [
                            {
                                name: "IITPSA - Institute of Information Technology Professionals of South Africa",
                                description: `<p>Former affiliate member with membership number NO83177 before moving back to Zimbabwe.</p>`
                            },
                            {
                                name: "Zimbabwe Presidential Scholarship of 2010",
                                description: `
                                <p>Was awarded the scholarship to study at the University of KwaZulu Natal in South Africa, due to academy excellence in 2010 for a three year program.</p>
                                \n
                                <p>&nbsp;</p>
                                \n
                                <p>Links:<br>a. <a href=\"https://www.aabri.com/manuscripts/141827.pdf\" rel=\"noopener\">https://www.aabri.com/manuscripts/141827.pdf</a><br>b. <a href=\"https://www.un.org/womenwatch/daw/csw/csw55/statements/Zimbabwe.pdf\" rel=\"noopener\">https://www.un.org/womenwatch/daw/csw/csw55/statements/Zimbabwe.pdf</a></p>
                                `
                            }
                        ]
                    }
                }
            }
        }
    })

    const user = await prisma.user.findUnique({
        where: { email: process.env.NEXT_PUBLIC_OWNER_EMAIL },
        include: { profile: true, role: true }
    })


    // PROFILE IMAGE

    if (user) {
        const updatedProfile = await prisma.profile.update({
            where: { userId: user.id },
            data: { imageUrl: `uploads/profile/${user.profile.id}/OwnerProfile.jpg` }
        })
        if (updatedProfile) {
            const imageFolder = path.resolve(`./src/assets/profile/OwnerProfile.jpg`)
            const finalImagePath = path.resolve(`./public/uploads/profile/${user.profile.id}/OwnerProfile.jpg`)
            fs.cp(imageFolder, finalImagePath, { recursive: true }, (err) => {
                if (err) console.error(`Error cpying image ${imageFolder} to ${finalImagePath}`, "\n", err, "\n", "")
                console.log(`Image ${imageFolder} copied to ${finalImagePath}`, "\n", "")
            })
        }

    }

    // TAGS
    for (const tag of tags) await prisma.tag.upsert({ where: { name: tag }, update: {}, create: { name: tag } })

    // SKILLS
    for (const skill of skills)
        await prisma.skill.upsert({ where: { name: skill }, update: {}, create: { name: skill } })

    // COUNTRIES
    for (const country of countries)
        await prisma.country.upsert({ where: { name: country.name }, update: {}, create: country })


    // EXPERIENCES
    for (const experience of experiences.map((e) => { return { profileId: user?.profile?.id, ...e } }))
        if (!await prisma.experience.findFirst({ where: { profileId: user?.profile?.id, title: experience.title, companyName: experience.companyName } }))
            await prisma.experience.create({ data: experience })

    // PROJECTS
    const projects = [
        {
            profileId: user?.profile?.id,
            projectName: "Admin and Client interface integrating social media",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            '
            <p>Created an Administration panel for integrating social media links like TikTok to the restaurants profile. This helps restaurant owners to connect with their customers on a more personal basis, increasing engagement with their regular customers, and attracting new customers from these platforms through word of mouth and promotions using the internal systems of the social media platforms they are on.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>I also created the Client interface which enables the restaurant&rsquo;s customers to connect with the restaurants social media links.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Reference: No reference can be provided as it is a company internal system.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Superb Aps"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Docker",
                    "Kubernetes",
                    "React",
                    "NextJS",
                    "Redux",
                    "npm",
                    "HTTP",
                    "REST",
                    "AWS",
                    "Linux",
                    "MySQL",
                    "Postgre",
                    "MongoDB",
                    "Redis",
                    "Nginx",
                    "Apache",
                    "TailwindCSS",
                    "Bootstrap",
                    "JIRA",
                    "Notion",
                    "Slack",
                    "Google Cloud",
                    "Express",
                    "Koa",
                    "Cypress",
                    "Markdown"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Norman Browser and Electron Desktop Application",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>The application is used in NimbleGroup&rsquo;s call centres based in Cape Town, Johannesburg and Kenya. It was built working as a team, and took approximately six months to finish from design to production. The application makes calls through webrtc, and has increased the call centre&rsquo;s productivity by reducing and simplifying the agent&rsquo;s workload. It is currently the main application that I help in maintaining, recently converting it to work directly in the browser.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>It is built using VueJS, Laravel, MSSQL, Redis, Websockets, WebRTC, ElasticSearch and various other integrations that are constantly being added or updated.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Reference: No reference can be provided as it is a company internal system.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Gitlab",
                    "Node",
                    "AdonisJS",
                    "Docker",
                    "Jquery",
                    "Vue",
                    "Laravel",
                    "Yii",
                    "Symfony",
                    "GraphQL",
                    "npm",
                    "composer",
                    "Cordova",
                    "Apollo",
                    "WebRTC",
                    "SocketIO",
                    "ElasticSearch",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "JSONAPI",
                    "Linux",
                    "Postgre",
                    "MSSQL",
                    "Redis",
                    "Nginx",
                    "Apache",
                    "TailwindCSS",
                    "Bootstrap",
                    "Express",
                    "Electron",
                    "Markdown"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "NimblePay Web Service",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>A web service for debtors to log in using the browser in order to manage their debt payments to NimbleGroup. It is built with VueJS, Apollo GraphQL and Socket IO in the frontend, and uses Laravel, GraphQL, Redis and MSSQL Database in the backend.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Reference: Website address is <a href=\"https://pay.nimblegroup.co.za\" rel=\"noopener\">https://pay.nimblegroup.co.za</a>.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Java",
                    "Bash",
                    "Git",
                    "Gitlab",
                    "Node",
                    "AdonisJS",
                    "Docker",
                    "Jquery",
                    "Vue",
                    "Laravel",
                    "Yii",
                    "Symfony",
                    "GraphQL",
                    "Quasar",
                    "npm",
                    "composer",
                    "Cordova",
                    "Apollo",
                    "WebRTC",
                    "SocketIO",
                    "ElasticSearch",
                    "Capacitor",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "JSONAPI",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Postgre",
                    "MSSQL",
                    "Redis",
                    "Nginx",
                    "Apache",
                    "TailwindCSS",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Electron",
                    "Gimp",
                    "InkScape",
                    "Markdown"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "NimblePay App",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>This is the mobile application companion to the NimblePay Web Service. I converted its old codebase from AngularJS to VueJS, and built it using the Quasar framework for the Android and Apple stores. It was a project I did alone for the NimbleGroup under supervision from the Lead Developer, and the app is available for download on both app stores.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>It uses Vue.js, Apollo GraphQL and Socket IO in the frontend, and Laravel, GraphQL, Redis and MSSQL Database in the backend.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Reference: The app download links are <a href=\"https://play.google.com/store/apps/details?id=com.nimble.nimblepay&amp;hl=en&amp;gl=US\" rel=\"noopener\">https://play.google.com/store/apps/details?id=com.nimble.nimblepay&amp;hl=en&amp;gl=US</a> and <a href=\"https://apps.apple.com/ke/app/nimblepay/id1057565672\" rel=\"noopener\">https://apps.apple.com/ke/app/nimblepay/id1057565672</a> for the Android and Apple store respectively.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Java",
                    "Bash",
                    "Git",
                    "Gitlab",
                    "Node",
                    "AdonisJS",
                    "Docker",
                    "Jquery",
                    "AngularJS",
                    "Vue",
                    "Laravel",
                    "Yii",
                    "Symfony",
                    "GraphQL",
                    "Quasar",
                    "npm",
                    "composer",
                    "Cordova",
                    "Apollo",
                    "WebRTC",
                    "SocketIO",
                    "ElasticSearch",
                    "Capacitor",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "JSONAPI",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Postgre",
                    "MSSQL",
                    "Redis",
                    "Nginx",
                    "Apache",
                    "TailwindCSS",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Cypress",
                    "Electron",
                    "Selenium",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "GooglePlay",
                    "IOS",
                    "Xcode",
                    "Android Studio",
                    "Puppeteer",
                    "Markdown"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Standard Bank Debicheck API Integration",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>I integrated the new debicheck payment facility from Standard Bank (Pty) Ltd with the Norman Electron app for NimbleGroup, in line with the new financial regulations regarding debit order payments.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>The integration was done with PHP via the Laravel Framework on the backend, integrating it with the SOAP API provided by the bank.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Reference: Integration reference is <a href=\"https://nimblegroup.co.za/introducing-debicheck\" rel=\"noopener\">https://nimblegroup.co.za/introducing-debicheck</a>.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Java",
                    "Bash",
                    "Git",
                    "Gitlab",
                    "Node",
                    "AdonisJS",
                    "Docker",
                    "Jquery",
                    "Vue",
                    "Laravel",
                    "Yii",
                    "Symfony",
                    "GraphQL",
                    "npm",
                    "composer",
                    "Apollo",
                    "WebRTC",
                    "SocketIO",
                    "ElasticSearch",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "JSONAPI",
                    "Linux",
                    "MySQL",
                    "Postgre",
                    "MSSQL",
                    "Redis",
                    "Nginx",
                    "Apache",
                    "Google Cloud",
                    "Express",
                    "Electron",
                    "XML",
                    "Markdown"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Brickfield Canvas System",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>I built an internal parking lot management system for a business complex called Brickfield Canvas in Cape Town. I used VueJS for the frontend, and AdonisJS in the backend, with SocketIO working as the notification system, with Postgre Database and Redis providing the data storage in the backend.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Reference: The client&rsquo;s website is <a href=\"https://www.brickfieldcanvas.com\" rel=\"noopener\">https://www.brickfieldcanvas.com</a>.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Gitlab",
                    "Node",
                    "AdonisJS",
                    "Docker",
                    "Vue",
                    "Laravel",
                    "Symfony",
                    "npm",
                    "composer",
                    "Cordova",
                    "Apollo",
                    "WebRTC",
                    "SocketIO",
                    "ElasticSearch",
                    "Capacitor",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "JSONAPI",
                    "Linux",
                    "Postgre",
                    "MSSQL",
                    "Redis",
                    "Nginx",
                    "Apache",
                    "TailwindCSS",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Cypress",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "GooglePlay",
                    "IOS",
                    "Xcode",
                    "Android Studio",
                    "Puppeteer",
                    "XML",
                    "Markdown",
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Ebranch Service",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>An internal service system for Nimble Group to manage the chat service for debtors needing assistance, and to provide useful statistics for management and other authorised personnel. It was built using SocketIO, Laravel, Redis and MSSQL Database.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Reference: The website address is <a href=\"https://nimblepay.nimblegroup.co.za/login\" rel=\"noopener\">https://nimblepay.nimblegroup.co.za/login</a>.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Gitlab",
                    "Node",
                    "AdonisJS",
                    "Docker",
                    "Jquery",
                    "AngularJS",
                    "Vue",
                    "Laravel",
                    "Yii",
                    "Symfony",
                    "GraphQL",
                    "npm",
                    "composer",
                    "Apollo",
                    "WebRTC",
                    "SocketIO",
                    "ElasticSearch",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "JSONAPI",
                    "Linux",
                    "Postgre",
                    "MSSQL",
                    "MongoDB",
                    "Redis",
                    "Nginx",
                    "Apache",
                    "Google Cloud",
                    "Express",
                    "Electron",
                    "XML",
                    "Markdown",
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        // {
        //     profileId: user?.profile?.id,
        //     projectName: "Completed Web Sites built on WordPress - (Built whilst as a freelance developer)",
        //     isOngoing: false,
        //     startDate: new Date('2022-09-01').toISOString(),
        //     endDate: new Date("2022-09-30").toISOString(),
        //     description: `
        //     1. https://www.hotslab.com – my personal portfolio website.
        //     2. http://www.waynne.co.za – a personal fitness provider.
        //     3. http://www.capetownestateagent.co.za – a landing page for a premier property estate agent.
        //     4. http://www.capewavefreight.co.za & http:// www.cmg-globalfreight.co.za – sister companies specializing
        //     in freight forwarding and clearance.
        //     5. http://www.intrinsicfreight.co.za – a freight forwarding and clearance company.
        //     6. http://www.meco.org.uk - a Muslim social and political blog.
        //     7. http://www.leisurecombined.co.za - a premier travel website listing holiday rentals for apartments and
        //     cars in Cape Town.
        //     `,
        //     experiences: {
        //         create: [
        //             {
        //                 experienceId: (await prisma.experience.findFirst({
        //                     where: {
        //                         profileId: user?.profile?.id, companyName: "Hotslab"
        //                     }
        //                 }))?.id
        //             }
        //         ]
        //     },
        //     tags: {
        //         create: [
        //             {
        //                 tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id
        //             }
        //         ]
        //     },
        //     skills: {
        //         create: (await populateSkills([
        //             "JavaScript",
        //             "Typescript",
        //             "PHP",
        //             "HTML",
        //             "SQL",
        //             "CSS",
        //             "Bash",
        //             "Git",
        //             "Github",
        //             "Node",
        //             "Jquery",
        //             "npm",
        //             "SOAP",
        //             "HTTP",
        //             "REST",
        //             "Linux",
        //             "MySQL",
        //             "MariaDB",
        //             "Nginx",
        //             "Apache",
        //             "Wordpress",
        //             "WooCommerce",
        //             "Bootstrap",
        //             "Google Cloud",
        //             "Express",
        //             "Gimp",
        //             "Photoshop",
        //             "InkScape",
        //             "XML",
        //             "Markdown",
        //             "CPanel"
        //         ])).map((skillId) => { return { skillId: skillId } })
        //     }
        // },
        {
            profileId: user?.profile?.id,
            projectName: "Bula Deals",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <div>
            \n
            <div>Bula Deals is a premier onlline store offering customers the best deals on many products they are looking for. The store offers various discounts and promotions, and can deliver the product to the the customers\'s door step or they can arrange to pick it up at the store\'s offices. This and more services helps to give customers an excellent online shopping experience.</div>
            \n<br>\n
            <div>I helped to maintain and&nbsp; construct some sections of the site and added the following features:</div>
            \n<br>\n
            <div>1. An integrated contact form to submit information to the site.</div>
            \n
            <div>2. Interactive widgets to make the site dynamic and user friendly.</div>
            \n
            <div>3. The ability to add products and updates through automated means using XML and various API services linked via Woocommerce.</div>
            \n
            <div>4. Integration with social networks to allow users to socialize on those platforms and receive updates.</div>
            \n
            <div>5. The site was built on the WordPress platform using the Woocommerce plugin, and it is fully customizable.</div>
            \n<br>\n
            <div>Website: <a href=\"https://web.archive.org/web/20160313035035/http://buladeals.com/\" rel=\"noopener\">http://www.buladeals.com</a></div>
            \n
            </div>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Personal Trainer Cape Town",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>Personal Trainer Cape Town offers one of the best one-on-one and group personal training in Cape Town. You get the best personal and specialistic services that cater to your individual needs, ensuring that you will reach your goal of a healthier you.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>I constructed the site and added the following features for the landing page:</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>1. An integrated contact form to submit information to the site.</p>
            \n
            <p>2. Interactive widgets to make the site dynamic and user friendly.</p>
            \n
            <p>3. The ability to post new future items, downloads and updates.</p>
            \n
            <p>4. Integration with social networks to allow users to socialize on those platforms and receive updates.</p>
            \n
            <p>5. The site was built on the WordPress platform, and it is fully customizable.&nbsp;</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Website:&nbsp;<a href=\"https://web.archive.org/web/20160526232243/http://waynne.co.za\" rel=\"noopener\">http://www.waynne.co.za</a></p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Properties Cape Town",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>Properties Cape Town is South African based Estate Agent Service focusing on premier property in and around Cape Town. The agency helps with the listing, viewing and valuation of exclusive and premier property, which it caters for the tastes of it&rsquo;s discerning and affluent clients.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>I constructed the site and added the following features for the landing page:</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>1. An integrated contact form to submit information to the site.</p>
            \n
            <p>2. Interactive widgets to make the site dynamic and user friendly.</p>
            \n
            <p>3. The ability to post new future items, downloads and updates.</p>
            \n
            <p>4. Integration with social networks to allow users to socialize on those platforms and receive updates.</p>
            \n
            <p>5. The site was built on the WordPress platform, and it is fully customizable.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Website: <a href=\"https://web.archive.org/web/20161201140052/http://commercialpropertiescapetown.co.za\" rel=\"noopener\">http://www.commercialpropertiescapetown.co.za</a></p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Capewave Freight Services",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>Capewave Freight Services is a South African based Customs Clearing and Forwarding Company. The company was established in 2010 to provide an essential service to Importers and Exporters. As a modest company, it is made up of well experienced and committed experts in the various fields of the Freight, Logistics and Shipping. It is the sister site to CMG Global Freight Logistics.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>I constructed the site and added the following features:</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>1. An integrated contact form to submit information to the site.</p>
            \n
            <p>2.&nbsp; A catalogue of services and interactive widgets to make the site dynamic and user friendly.</p>
            \n
            <p>3. The ability to post new items, downloads and updates.</p>
            \n
            <p>4. Integration with Facebook to allow users to view the site&rsquo;s profile, and to socialize also on that platform.</p>
            \n
            <p>5. The site was built on the WordPress platform, and it is fully customizable.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Website:&nbsp;<a href=\"https://web.archive.org/web/20160724145813/http://www.capewavefreight.co.za\" rel=\"noopener\">http://www.capewavefreight.co.za</a></p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Intrinisic Freight Agency",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>Intrinsic Freight Agency is a South African based Customs Clearing and Forwarding Company. The company to provides an essential services to Importers and Exporters. As a modest company it is made up of well experienced and committed experts in the various fields of the Freight, Logistics and Shipping.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>I constructed the site and added the following features:</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>1. An integrated contact form to submit information to the site.</p>
            \n
            <p>2. A catalogue of services and interactive widgets to make the site dynamic and user friendly.</p>
            \n
            <p>3. The ability to post new items, downloads and updates.</p>
            \n
            <p>4. The site was built on the WordPress platform, and it is fully customizable.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Website:&nbsp;<a href=\"https://web.archive.org/web/20161016121857/https://www.intrinsicfreight.co.za\" rel=\"noopener\">http://www.intrinsicfreight.co.za</a></p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "CMG Global Freight & Logistics",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>CMG GLOBAL FREIGHT &amp; LOGISTICS is a South African based Customs Clearing and Forwarding Company. The company was established in 2010 to provide an essential service to Importers and Exporters. As a modest company it is made up of well experienced and committed experts in the various fields of Freight, Logistics and Shipping.&nbsp;</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>I constructed the site and added the following features:</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>1. An integrated contact and career form to submit information to the site.</p>
            \n
            <p>2. A catalogue of services and interactive widgets to make the site dynamic and user friendly.</p>
            \n
            <p>3. The ability to post new items, downloads and updates.</p>
            \n
            <p>4. Integration with Facebook to allow users to view the site&rsquo;s profile, and to socialize on that platform.</p>
            \n
            <p>5. The site was built on the WordPress platform, and it is fully customizable.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Website:&nbsp;<a href=\"https://web.archive.org/web/20161113065421/http://cmg-globalfreight.co.za\" rel=\"noopener\">http://www.cmg-globalfreight.co.za</a></p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Muslim Educational Centre of Oxford",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>MECO (Muslim Educational Centre of Oxford University), is an online socio-political blog addressing issues and topics affecting the Muslim world. The site site acts primarily as a online blog and news center, much in the same way as a magazine site, and showcases the features that HOTSLAB can add in creating a online magazine site.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>The site was built on the WordPress platform and the site is fully customizable.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Website:&nbsp;<a href=\"https://web.archive.org/web/20170507063134/http://www.meco.org.uk\" rel=\"noopener\">http://www.meco.org.uk</a></p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Leisure Combined",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>Leisure Combined is a premier travel site made for the most discerning travelers who require a quality service. The site acts as a one stop center for all travel needs and helps people to prepare for their trips to South Africa as well as the rest of the World.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>I constructed the site and added the following features:</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>1. An intergrated worldwide flight, hotel and car rental search engine.</p>
            \n
            <p>2. A catalogue of premier apartments for travelers to choose from when they visit Cape Town.&nbsp;</p>
            \n
            <p>3. Posting of news items, downloads and updates.</p>
            \n
            <p>4. The site was built on the WordPress platform and the site is fully customizable.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Website:&nbsp;<a href=\"https://web.archive.org/web/20181112171743/http://leisurecombined.co.za\" rel=\"noopener\">http://www.leisurecombined.co.za</a></p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "JavaScript",
                    "Typescript",
                    "PHP",
                    "HTML",
                    "SQL",
                    "CSS",
                    "Bash",
                    "Git",
                    "Github",
                    "Node",
                    "Jquery",
                    "npm",
                    "SOAP",
                    "HTTP",
                    "REST",
                    "Linux",
                    "MySQL",
                    "MariaDB",
                    "Nginx",
                    "Apache",
                    "Wordpress",
                    "WooCommerce",
                    "Bootstrap",
                    "Google Cloud",
                    "Express",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                    "XML",
                    "Markdown",
                    "CPanel"
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Sage Plumbing Roll Up Banner",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>Designed the roll up banner for Sage Plumbing used for advertising through street display.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "design" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "Google Cloud",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                ])).map((skillId) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id,
            projectName: "Properties Cape Town Flyer",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            <p>Business&nbsp; flyer for Properties Cape Town.</p>
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id, companyName: "Hotslab"
                            }
                        }))?.id
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "design" } }))?.id
                    }
                ]
            },
            skills: {
                create: (await populateSkills([
                    "Google Cloud",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                ])).map((skillId) => { return { skillId: skillId } })
            }
        }
    ]

    for (const project of projects) {
        const exists = await prisma.project.findMany({
            where: {
                projectName: project.projectName,
                description: project.description
            }
        })
        if (exists.length === 0) await prisma.project.create({ data: project })
    }


    // PROJECT IMAGES
    for (const projectImage of projectImages) {
        const existingProject = await prisma.project.findFirst({ where: { projectName: projectImage.projectName } })
        if (existingProject) {
            let updatedProjectImage = null
            updatedProjectImage = await prisma.projectImage.findFirst({
                where: {
                    caption: projectImage.caption,
                    url: `uploads/project/${existingProject.id}/${projectImage.image}`,
                    projectId: existingProject.id
                }
            })
            if (!updatedProjectImage) updatedProjectImage = await prisma.projectImage.create({
                data: {
                    caption: projectImage.caption,
                    url: `uploads/project/${existingProject.id}/${projectImage.image}`,
                    projectId: existingProject.id
                }
            })
            if (updatedProjectImage) {
                const imageFolder = path.resolve(`./src/assets/project/${projectImage.image}`)
                const finalImagePath = path.resolve(`./public/uploads/project/${existingProject.id}/${projectImage.image}`)
                fs.cp(imageFolder, finalImagePath, { recursive: true }, (err) => {
                    if (err) console.error(`Error copying image ${imageFolder} to ${finalImagePath}`, "\n", err, "\n", "")
                    console.log(`Image ${imageFolder} copied to ${finalImagePath}`, "\n", "")
                })
            }
        }
    }

    // EDUCATION
    for (const education of educations.map((e) => { return { profileId: user?.profile?.id, ...e } }))
        if (!await prisma.education.findFirst({ where: { profileId: user?.profile?.id, title: education.title, school: education.school } }))
            await prisma.education.create({ data: education })


    console.log(`Seeding finished.`)
}

if (process.env.NEXT_PUBLIC_OWNER_EMAIL && process.env.NEXT_PUBLIC_OWNER_PASSWORD) {
    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
} else {
    console.log("User details for owner not provided")
}