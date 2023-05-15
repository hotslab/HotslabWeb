import Layout from "@/components/Layout"
import { SkillExtended } from "@prisma/client"
import Skills from "@/components/Skill/Skills"

type Props = { skills: SkillExtended[] | [] }

export default function SkillList({ skills }: Props) {
    return (
        <Layout>
            <div className="min-h-full bg-white">
                <div className="container mx-auto py-10 px-4">
                    <Skills
                        skills={skills}
                    />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/skill", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
    const skills = (await response.json()).data
    return { props: { skills } }
}
