import Layout from "@/components/Layout"
import Router from "next/router"
import { Tag } from "@prisma/client"
import Tags from "@/components/Tag/Tags"

type Props = { tags: Tag[] | [] }

export default function TagList({ tags }: Props) {
    return (
        <Layout>
            <div className="min-h-full bg-white">
                <div className="container mx-auto py-10 px-4">
                    <Tags
                        tags={tags}
                    />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/tag", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
    const tags = (await response.json()).data
    return { props: { tags } }
}
