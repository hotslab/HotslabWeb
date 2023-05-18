import Layout from "@/components/Layout"
import Router from "next/router"
import { Tag } from "@prisma/client"
import Tags from "@/components/Tag/Tags"
import { ComponentWithAuth } from "../../../types/authenticated"

type Props = { tags: Tag[] | [] }

const TagList: ComponentWithAuth<Props> = ({ tags }: Props) => {
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

export async function getServerSideProps(context: any) {
    const response = await fetch("http://localhost:3000/api/tag", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    })
    const tags = (await response.json()).data
    return { props: { tags } }
}

TagList.auth = true

export default TagList