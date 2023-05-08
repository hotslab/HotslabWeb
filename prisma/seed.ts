import { PrismaClient } from '@prisma/client'
import * as argon2 from "argon2"
import { Skill } from '@prisma/client'

const prisma = new PrismaClient()

async function populateSkills(skillList: string[] | []): Promise<number[] | []> {
    const skills: Skill[] = await prisma.skill.findMany({ where: { OR: skillList.map((skill: string) => { return { name: skill } }) } })
    return skills.length > 0 ? skills.map((skill: Skill) => skill.id) : []
}

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
                                description: `Former affiliate member with membership number NO83177 before moving back to Zimbabwe.`
                            },
                            {
                                name: "Zimbabwe Presidential Scholarship of 2010",
                                description: `
                                Was awarded the scholarship to study at the University of KwaZulu Natal in South Africa,
                                due to academy excellence in 2010 for a three year program.
                                `
                            }
                        ]
                    }
                }
            }
        }
    })

    const user = await prisma.user.findUnique({
        where: { email: "joseph.nyahuye@gmail.com" },
        include: { profile: true, role: true }
    })

    // TAGS
    const tags = [
        "project",
        "portfolio",
        "design",
    ]

    for (const tag of tags) await prisma.tag.upsert({ where: { name: tag }, update: {}, create: { name: tag } })

    // SKILLS

    const skills = [
        "JavaScript",
        "Typescript",
        "PHP",
        "HTML",
        "SQL",
        "CSS",
        "Java",
        "Python",
        "Bash",
        "Git",
        "Gitlab",
        "Github",
        "Node",
        "AdonisJS",
        "Docker",
        "Kubernetes",
        "Jquery",
        "AngularJS",
        "React",
        "Angular",
        "Vue",
        "Laravel",
        "Yii",
        "Symfony",
        "GraphQL",
        "Quasar",
        "NextJS",
        "Redux",
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
        "AWS",
        "Linux",
        "MySQL",
        "MariaDB",
        "Postgre",
        "MSSQL",
        "MongoDB",
        "Redis",
        "Nginx",
        "Apache",
        "Wordpress",
        "WooCommerce",
        "TailwindCSS",
        "Bootstrap",
        "JIRA",
        "Notion",
        "Slack",
        "Google Cloud",
        "Express",
        "Koa",
        "Cypress",
        "Electron",
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
        "CPanel"
    ]

    for (const skill of skills)
        await prisma.skill.upsert({ where: { name: skill }, update: {}, create: { name: skill } })


    // EXPERIENCES
    const experiences = [
        {
            profileId: user?.profile?.id as any,
            title: "Full Stack Engineer",
            employmentType: "Full Time",
            companyName: "Superb Aps",
            location: "Zimbabwe",
            locationType: "Remote",
            isCurrentPosition: false,
            startDate: new Date("2022-09-01").toISOString(),
            endDate: new Date("2022-12-31").toISOString(),
            industry: "Software Development",
            description: `
            I worked as a full stack engineer at Superb Aps from October to December 2022. I was unfortunately laid
            off from my job at the start of December. This is due to one of the company’s venture capital funders
            pulling out unexpectedly in the latest funding round, citing some financial trouble on their end due to the
            economic downturn in the market. This unfortunately forced Superb Aps to lay off a large part of its staff
            to cut costs.
            The technology stack I worked on was mostly based on JavaScript both the frontend and backend. I
            worked with React.js, MongoDB, Redis, Koa.js, Docker, Kubernetes, AWS, Mailtrap and other various
            tools a bit lengthy to mention here, but will be happy to elaborate on should you request for it.
            For reference please contact Mr Henrik Karlsson (CTO) at henrik.karlsson@superbexperience.com
            `
        },
        {
            profileId: user?.profile?.id as any,
            title: "Full Stack Software Developer",
            employmentType: "Full Time",
            companyName: "Evision/Ebit Technologies",
            location: "South Africa and Zimbabwe",
            locationType: "Hybrid",
            isCurrentPosition: false,
            startDate: new Date("2016-08-01").toISOString(),
            endDate: new Date("2022-08-31").toISOString(),
            industry: "Software Development",
            description: `
            I worked as an onsite full stack software developer from August 2016 to 2020 in South Africa, and
            remotely in Zimbabwe until end of September 2022, building web applications targeting desktop and
            mobile environments for our major customer and one of South Africa’s biggest debt collectors, Nimble
            Group (Pty) Ltd (https://nimblegroup.co.za).
            The technology stack we primarily use is JavaScript on the frontend via the VueJS framework, and PHP
            on the backend via the Laravel framework. We also use NodeJS in the server to run other services like
            sockets via SocketIO, and to interact with in-memory databases like Redis for fast data access.
            For reference please contact Mr Corne Dreyer (Managing Director) at corne@evision.co.za / +2721 003
            0087.
            `
        },
        {
            profileId: user?.profile?.id as any,
            title: "Freelance Web Developer",
            employmentType: "Part Time",
            companyName: "Hotslab",
            location: "South Africa",
            locationType: "Onsite",
            isCurrentPosition: false,
            startDate: new Date("2015-10-01").toISOString(),
            endDate: new Date("2016-09-01").toISOString(),
            industry: "Software Development",
            description: `
            Web design and development from September 2015 to August 2016 on a freelance basis. The work
            consisted of managing an e-commerce store called Buladeals (https://www.buladeals.com), on a part time
            basis. I also worked on various projects built under my own portfolio agency, operating under the
            business name of Hotslab (http://www.hotslab.com). Most of the sites were built using WordPress.
            `
        },
        {
            profileId: user?.profile?.id as any,
            title: "Cashier",
            employmentType: "Part Time",
            companyName: "The Cape Wheel",
            location: "South Africa",
            locationType: "Onsite",
            isCurrentPosition: false,
            startDate: new Date("2014-12-02").toISOString(),
            endDate: new Date("2015-09-31").toISOString(),
            industry: "Hospitality",
            description: `
            Cashier for the Cape Wheel in the VA Waterfront Shopping Centre, on a part-time contract starting from 2
            December 2014 up to September 2015. For reference please call Mr Brynn Roberts (General Manager)
            on 021 418 2502.
            `
        },
        {
            profileId: user?.profile?.id as any,
            title: "Store Room Manager",
            employmentType: "Full Time",
            companyName: "Fastway Couriers (Pty) Ltd",
            location: "South Africa",
            locationType: "Onsite",
            isCurrentPosition: false,
            startDate: new Date("2015-02-01").toISOString(),
            endDate: new Date("2015-06-31").toISOString(),
            industry: "Freight Services",
            description: `
            Store Room Supervisor at Fastway Couriers, starting from February 2015 to end June 2015. For
            reference please call Mrs Phyllis Timba (Financial Manager) on 0861 222 882 or 076 914 5584.
            `
        },
        {
            profileId: user?.profile?.id as any,
            title: "Call Centre Sales Agent",
            employmentType: "Full Time",
            companyName: "Netsurit IT Support (Pty) Ltd",
            location: "South Africa",
            locationType: "Onsite",
            isCurrentPosition: false,
            startDate: new Date("2014-07-01").toISOString(),
            endDate: new Date("2014-09-31").toISOString(),
            industry: "IT Services",
            description: `
            Outbound Telephonic Sales Consultant at Netsurit for a 3 month contract beginning 1 August 2014 and ending
            31 October 2014. Contact Mr Christian Papst on 021 404 3600.
            `
        },
    ]

    for (const experience of experiences)
        if (!await prisma.experience.findFirst({ where: { profileId: user?.profile?.id as any, title: experience.title, companyName: experience.companyName } }))
            await prisma.experience.create({ data: experience })

    // PROJECTS
    const projects = [
        {
            profileId: user?.profile?.id as any,
            projectName: "Admin and Client interface integrating social media",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Created an Administration panel for integrating social media links like TikTok to the restaurants profile.
            This helps restaurant owners to connect with their customers on a more personal basis, increasing
            engagement with their regular customers, and attracting new customers from these platforms through
            word of mouth and promotions using the internal systems of the social media platforms they are on. I also
            created the Client interface which enables the restaurant’s customers to connect with the restaurants
            social media links.
            Reference: No reference can be provided as it is a company internal system.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Superb Aps"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Norman Browser and Electron Desktop Application",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            The application is used in NimbleGroup’s call centres based in Cape Town, Johannesburg and Kenya. It
            was built working as a team, and took approximately six months to finish from design to production. The
            application makes calls through webrtc, and has increased the call centre’s productivity by reducing and
            simplifying the agent’s workload. It is currently the main application that I help in maintaining, recently
            converting it to work directly in the browser. It is built using VueJS, Laravel, MSSQL, Redis, Websockets,
            WebRTC, ElasticSearch and various other integrations that are constantly being added or updated.
            Reference: No reference can be provided as it is a company internal system.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "NimblePay Web Service",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            A web service for debtors to log in using the browser in order to manage their debt payments to
            NimbleGroup. It is built with VueJS, Apollo GraphQL and Socket IO in the frontend, and uses Laravel,
            GraphQL, Redis and MSSQL Database in the backend.
            Reference: Website address is https://pay.nimblegroup.co.za.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "NimblePay App",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            This is the mobile application companion to the NimblePay Web Service. I converted its old codebase
            from AngularJS to VueJS, and built it using the Quasar framework for the Android and Apple stores. It
            was a project I did alone for the NimbleGroup under supervision from the Lead Developer, and the app is
            available for download on both app stores. It uses Vue.js, Apollo GraphQL and Socket IO in the frontend,
            and Laravel, GraphQL, Redis and MSSQL Database in the backend.
            Reference: The app download links are https://play.google.com/store/apps/details?
            id=com.nimble.nimblepay&hl=en&gl=US and https://apps.apple.com/ke/app/nimblepay/id1057565672 for
            the Android and Apple store respectively.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Standard Bank Debicheck API Integration",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            I integrated the new debicheck payment facility from Standard Bank (Pty) Ltd with the Norman Electron
            app for NimbleGroup, in line with the new financial regulations regarding debit order payments. The
            integration was done with PHP via the Laravel Framework on the backend, integrating it with the SOAP
            API provided by the bank.
            Reference: Integration reference is https://nimblegroup.co.za/introducing-debicheck.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Brickfield Canvas System",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            I built an internal parking lot management system for a business complex called Brickfield Canvas in
            Cape Town. I used VueJS for the frontend, and AdonisJS in the backend, with SocketIO working as the
            notification system, with Postgre Database and Redis providing the data storage in the backend.
            Reference: The client’s website is https://www.brickfieldcanvas.com.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Ebranch Service",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            An internal service system for Nimble Group to manage the chat service for debtors needing assistance,
            and to provide useful statistics for management and other authorised personnel. It was built using
            SocketIO, Laravel, Redis and MSSQL Database.
            Reference: The website address is https://nimblepay.nimblegroup.co.za/login.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Evision/Ebit Technologies"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Completed Web Sites built on WordPress - (Built whilst as a freelance developer)",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            1. https://www.hotslab.com – my personal portfolio website.
            2. http://www.waynne.co.za – a personal fitness provider.
            3. http://www.capetownestateagent.co.za – a landing page for a premier property estate agent.
            4. http://www.capewavefreight.co.za & http:// www.cmg-globalfreight.co.za – sister companies specializing
            in freight forwarding and clearance.
            5. http://www.intrinsicfreight.co.za – a freight forwarding and clearance company.
            6. http://www.meco.org.uk - a Muslim social and political blog.
            7. http://www.leisurecombined.co.za - a premier travel website listing holiday rentals for apartments and
            cars in Cape Town.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "project" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Personal Trainer Cape Town",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Personal Trainer Cape Town offers one of the best one-on-one and group personal training in Cape Town. You get the best personal and specialistic services that cater to your individual needs, ensuring that you will reach your goal of a healthier you.

            We constructed the site and added the following features for the landing page:

            An integrated contact form to submit information to the site.
            Interactive widgets to make the site dynamic and user friendly.
            The ability to post new future items, downloads and updates.
            Integration with social networks to allow users to socialize on those platforms and receive updates.
            The site was built on the WordPress platform, and it is fully customizable.

            Website: http://www.waynne.co.za
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Properties Cape Town",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Properties Cape Town is  South African based Estate Agent Service focusing on premier property in and around Cape Town. The agency helps with the listing, viewing and valuation of exclusive and premier property, which it caters for the tastes of it’s discerning and affluent clients.

            We constructed the site and added the following features for the landing page:

            An integrated contact form to submit information to the site.
            Interactive widgets to make the site dynamic and user friendly.
            The ability to post new future items, downloads and updates.
            Integration with social networks to allow users to socialize on those platforms and receive updates.
            The site was built on the WordPress platform, and it is fully customizable.

            Website: http://www.capetownestateagent.co.za
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Capewave Freight Services",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Capewave Freight Services is a South African based Customs Clearing and Forwarding Company. The company was established in 2010 to provide an essential service to Importers and Exporters. As a modest company, it is made up of well experienced and committed experts in the various fields of the Freight, Logistics and Shipping. It is the sister site to CMG Global Freight Logistics.

            We constructed the site and added the following features:

            An integrated contact form to submit information to the site.
            A catalogue of services and interactive widgets to make the site dynamic and user friendly.
            The ability to post new items, downloads and updates.
            Integration with Facebook to allow users to view the site’s profile, and to socialize also on that platform.
            The site was built on the WordPress platform, and it is fully customizable.

            URL: http://www.capewavefreight.co.za
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Intrinisic Freight Agency",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Intrinsic Freight Agency is a South African based Customs Clearing and Forwarding Company. The company to provides an essential services to Importers and Exporters. As a modest company it is made up of well experienced and committed experts in the various fields of the Freight, Logistics and Shipping.

            We constructed the site and added the following features:

            An integrated contact form to submit information to the site.
            A catalogue of services and interactive widgets to make the site dynamic and user friendly.
            The ability to post new items, downloads and updates.
            The site was built on the WordPress platform, and it is fully customizable.

            URL: http://www.intrinsicfreight.co.za
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "CMG Global Freight & Logistics",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            CMG GLOBAL FREIGHT & LOGISTICS is a South African based Customs Clearing and Forwarding Company. The company was established in 2010 to provide an essential service to Importers and Exporters. As a modest company it is made up of well experienced and committed experts in the various fields of Freight, Logistics and Shipping.

            We constructed the site and added the following features:

            An integrated contact and career form to submit information to the site.
            A catalogue of services and interactive widgets to make the site dynamic and user friendly.
            The ability to post new items, downloads and updates.
            Integration with Facebook to allow users to view the site’s profile, and to socialize on that platform.
            The site was built on the WordPress platform, and it is fully customizable.

            URL: http://www.cmg-globalfreight.co.za
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Muslim Educational Centre of Oxford",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            MECO (Muslim Educational Centre of Oxford University), is an online socio-political blog addressing issues and topics affecting the Muslim world.

            The site site acts primarily as a online blog and news center, much in the same way as a magazine site, and showcases the features that HOTSLAB can add in creating a online magazine site.

            The site was built on the WordPress platform and the site is fully customizable.

            URL: http://www.meco.org.uk
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Leisure Combined",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Leisure Combined is a premier travel site made for the most discerning travelers who require a quality service. The site acts as a one stop center for all travel needs and helps people to prepare for their trips to South Africa as well as the rest of the World.

            We constructed the site and added the following features:

            1. An intergrated worldwide flight, hotel and car rental search engine
            2. A catalogue of premier apartments for travelers to choose from when they visit Cape Town.
            4. Posting of news items, downloads and updates.

            The site was built on the WordPress platform and the site is fully customizable.

            URL: http://www.leisurecombined.co.za
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "portfolio" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
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
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Sage Plumbing Roll Up Banner",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Roll up banner for Sage Plumbing used for advertising.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "design" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
                ]
            },
            skills: {
                create: (await populateSkills([
                    "Google Cloud",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        },
        {
            profileId: user?.profile?.id as any,
            projectName: "Properties Cape Town Business Card",
            isOngoing: false,
            startDate: new Date('2022-09-01').toISOString(),
            endDate: new Date("2022-09-30").toISOString(),
            description: `
            Business card for Properties Cape Town.
            `,
            experiences: {
                create: [
                    {
                        experienceId: (await prisma.experience.findFirst({
                            where: {
                                profileId: user?.profile?.id as any, companyName: "Hotslab"
                            }
                        }))?.id as any
                    }
                ]
            },
            tags: {
                create: [
                    {
                        tagId: (await prisma.tag.findUnique({ where: { name: "design" } }))?.id as any
                    }
                ]
            },
            images: {
                create: [
                    { url: "/uploads/cargo.jpg", caption: "Cargo" },
                    { url: "/uploads/food.jpg", caption: "Food" },
                ]
            },
            skills: {
                create: (await populateSkills([
                    "Google Cloud",
                    "Gimp",
                    "Photoshop",
                    "InkScape",
                ])).map((skillId: number) => { return { skillId: skillId } })
            }
        }
    ]

    for (const project of projects)
        await prisma.project.upsert({ where: { projectName: project.projectName }, update: {}, create: project })


    // EDUCATION
    const educations = [
        {
            profileId: user?.profile?.id as any,
            title: 'Bachelor of Social Science',
            school: 'University of Kwa-Zulu Natal',
            location: "South Africa",
            description: `
            Majored in Economics and Development Studies under the 
            Zimababwe Presidential Scholarship program for disadvantaged students.
            `,
            startDate: new Date('2010-01-01').toISOString(),
            endDate: new Date('2012-12-31').toISOString()
        },
        {
            profileId: user?.profile?.id as any,
            title: 'ZIMSEC 2007 A-Levels',
            school: 'Ellis Robins Boys High School',
            location: "Zimbabwe",
            description: `
            High school education completed with the following grades:
            i. Economics – A
            ii. Management of Business – B
            iii. Accounting – C
            `,
            startDate: new Date('2002-01-01').toISOString(),
            endDate: new Date('2007-12-31').toISOString()
        }
    ]

    for (const education of educations)
        if (!await prisma.education.findFirst({ where: { profileId: user?.profile?.id as any, title: education.title, school: education.school } }))
            await prisma.education.create({ data: education })


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