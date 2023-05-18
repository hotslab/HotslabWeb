import Layout from "@/components/Layout"
import { RoleExtended } from "@prisma/client"
import Roles from "@/components/Role/Roles"
import { ComponentWithAuth } from "../../../types/authenticated"

type Props = { roles: RoleExtended[] | [] }

const RoleList: ComponentWithAuth<Props> = ({ roles }: Props) => {
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

export async function getServerSideProps(context: any) {
    const response = await fetch("http://localhost:3000/api/role", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    })
    const roles = (await response.json()).data
    return { props: { roles } }
}

RoleList.auth = true

export default RoleList