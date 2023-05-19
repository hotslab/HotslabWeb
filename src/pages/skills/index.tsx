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
    const response = await fetch("http://localhost:3000/api/skill", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    })
    const skills = (await response.json()).data
    return { props: { skills } }
}

SkillList.auth = true

export default SkillList
