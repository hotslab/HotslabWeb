import { RoleExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"
import RoleEdit from "@/components/Role/RoleEdit"
import { useState } from "react"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import Modal from "@/components/Modal"

type props = {
    roles: RoleExtended[] | []
    close?: Function
}

export default function Roles({ roles, close }: props) {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState<RoleExtended | null>(null)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

    const router = useRouter()

    function openEdit(role: RoleExtended | null) {
        setSelectedRole(role)
        setShowEdit(true)
    }
    function openOrCloseDelete(role: RoleExtended | null = null) {
        setSelectedRole(role)
        setShowConfirmModal(role ? true : false)
    }
    async function deleteItem() {
        if (selectedRole) {
            eventBus.dispatch("openLoadingPage", true)
            await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/role/${selectedRole.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                    },
                }).then(async response => {
                    if (response.ok) router.replace(router.asPath)
                    else eventBus.dispatch("openErrorModal", (await response.json()).data)
                    openOrCloseDelete()
                    eventBus.dispatch("openLoadingPage", false)
                })
        } else eventBus.dispatch("openErrorModal", "Role selected for deletion is missing")
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
                        <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3 text-white">
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
                            <table className="table w-full text-white">
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
                                                        onClick={() => openOrCloseDelete(role)}
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
                    : <RoleEdit role={selectedRole} close={closeEdit} />
            }
            {
                showConfirmModal &&
                <Modal>
                    <h2 className="text-gray-900 text-xl">
                        <span>Delete </span>
                        <span className="text-info">{selectedRole?.name}</span>
                        ?
                    </h2>
                    <div className="w-full flex justify-end items-center gap-5 py-5">
                        <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => openOrCloseDelete()}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => deleteItem()}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            }
        </div>
    )
}