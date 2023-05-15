import { RoleExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import RoleEdit from "@/components/Role/RoleEdit"
import { useState } from "react"
import { useRouter } from "next/router"

type props = {
    roles: RoleExtended[] | []
    close?: Function
}

export default function Roles({ roles, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState<RoleExtended | null>(null)

    const router = useRouter()

    function openEdit(role: RoleExtended | null) {
        setSelectedRole(role)
        setShowEdit(true)
    }
    async function deleteItem(role: RoleExtended) {
        await fetch(
            `http://localhost:3000/api/role/${role.id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                if (response.ok) router.replace(router.asPath)
                else console.error(response.body)
            })
    }
    function closeEdit() {
        setSelectedRole(null)
        setShowEdit(false)
    }
    return (
        <div>
            {
                !showEdit ?
                    <div>
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                            <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                <span>Roles</span>
                                <span>{roles.length}</span>
                            </div>
                            <div className="mt-2 flex justify-start sm:justify-end items-start flex-wrap gap-5">
                                {
                                    close &&
                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        onClick={() => close()}
                                    >
                                        Back
                                    </button>
                                }
                                <button
                                    className="btn btn-sm btn-success text-white"
                                    onClick={() => openEdit(null)}
                                >
                                    New Role
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Edit</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Active</th>
                                        <th>Users</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map(
                                        (role: RoleExtended, index: number, array: RoleExtended[]) => (
                                            <tr key={index} className="hover">
                                                <th className="flex justify-start items-center gap-5 py-5">
                                                    <MdEditSquare
                                                        title="Edit"
                                                        className="text-success cursor-pointer"
                                                        onClick={() => openEdit(role)}
                                                    />
                                                    <MdDelete
                                                        title="Delete"
                                                        className="text-error cursor-pointer"
                                                        onClick={() => deleteItem(role)}
                                                    />
                                                </th>
                                                <td>{role.id}</td>
                                                <td>{role.name}</td>
                                                <td>{Boolean(role.active) ? "Yes" : "No"}</td>
                                                <td>{role.users.length}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <RoleEdit role={selectedRole} close={closeEdit} />}
        </div>
    )
}