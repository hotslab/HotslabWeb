import Layout from "@/components/Layout"
import { RoleExtended } from "@prisma/client"
import Roles from "@/components/Role/Roles"
import { ComponentWithAuth } from "../../../types/authenticated"
import Head from "next/head"

type Props = { roles: RoleExtended[] | [] }

const RoleList: ComponentWithAuth<Props> = ({ roles }: Props) => {
    return (
        <Layout>
            <Head>
                <title>Roles</title>
                <meta property='og:title' content="Roles" />
                <meta name="description" property='og:description' content="Roles for Hotslab users." />
                <meta name="author" content="Joseph Nyahuye" />
                <meta name="keywords" content="roles" />
            </Head>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto py-10 px-4">
                    <Roles
                        roles={roles}
                    />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    let roles: RoleExtended[] | [] = []
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/role`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "cookie": context.req.headers.cookie || ""
            },
        }).then(async response => {
            if (response.ok) {
                roles = (await response.json()).data
            } else console.log((await response.json()).data)
        })
    } catch (error) {
        console.log("error", error)
    }
    return { props: { roles } }
}

RoleList.auth = true

export default RoleList