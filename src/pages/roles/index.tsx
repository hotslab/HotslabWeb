import Layout from "@/components/Layout"
import { RoleExtended } from "@prisma/client"
import Roles from "@/components/Role/Roles"

type Props = { roles: RoleExtended[] | [] }

export default function RoleList({ roles }: Props) {
    return (
        <Layout>
            <div className="min-h-full bg-white">
                <div className="container mx-auto py-10 px-4">
                    <Roles
                        roles={roles}
                    />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/role", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
    const roles = (await response.json()).data
    return { props: { roles } }
}
