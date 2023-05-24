import Layout from "@/components/Layout"
import Router from "next/router"
import { Tag } from "@prisma/client"
import Tags from "@/components/Tag/Tags"
import { ComponentWithAuth } from "../../../types/authenticated"
import Head from "next/head"

type Props = { tags: Tag[] | [] }

const TagList: ComponentWithAuth<Props> = ({ tags }: Props) => {
    return (
        <Layout>
            <Head>
                <title>Tags</title>
            </Head>
            <div className="min-h-screen bg-white">
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
    let tags: Tag[] | [] = []
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tag`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    }).then(async response => {
        if (response.ok) {
            tags = (await response.json()).data
        } else console.log((await response.json()).data)
    })
    return { props: { tags } }
}

TagList.auth = true

export default TagList