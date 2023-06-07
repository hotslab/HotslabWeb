import Layout from "@/components/Layout"
import { SkillExtended } from "@prisma/client"
import Skills from "@/components/Skill/Skills"
import { ComponentWithAuth } from "../../../types/authenticated"
import Head from "next/head"

type Props = { skills: SkillExtended[] | [] }

const SkillList: ComponentWithAuth<Props> = ({ skills }: Props) => {
    return (
        <Layout>
            <Head>
                <title>Skills</title>
                <meta property='og:title' content="Skills" />
                <meta name="description" property='og:description' content="Skills used for Hotslab projects and developer work experiences." />
                <meta name="author" content="Joseph Nyahuye" />
                <meta name="keywords" content="skills" />
            </Head>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto py-10 px-4">
                    <Skills
                        skills={skills}
                    />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    let skills: SkillExtended[] | [] = []
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/skill`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    }).then(async response => {
        if (response.ok) {
            skills = (await response.json()).data
        } else console.log((await response.json()).data)
    })
    return { props: { skills } }
}

SkillList.auth = true

export default SkillList
