import { useState } from "react"
import { UserExtended } from "@prisma/client"
import { Role } from "../../../prisma/generated/client"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"

type props = { user: UserExtended | null, roles: Role[], close: Function }

export default function UserEdit({ user, roles, close }: props) {
    const [email, setEmail] = useState(user?.email || "")
    const [password, setPassword] = useState("")
    const [name, setName] = useState(user?.name || "")
    const [surname, setSurname] = useState(user?.surname || "")
    const [active, setActive] = useState(user ? Boolean(user.active) : false)
    const [showProfile, setShowProfile] = useState(user ? Boolean(user.showProfile) : false)
    const [roleId, setRoleId] = useState(user?.roleId)

    const router = useRouter()

    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
        let data = {
            email: email,
            password: password,
            name: name,
            surname: surname,
            active: active,
            showProfile: showProfile,
            roleId: roleId,
            isOwnerRemoval: false
        }
        if (user) {
            const currentRole = roles.find((e: Role) => e.id == user.roleId)
            const newRole = roles.find((e: Role) => e.id == roleId)
            if (currentRole && newRole) {
                if (currentRole.name === "Owner" && currentRole.name !== newRole.name) data.isOwnerRemoval = true
            } else eventBus.dispatch("openErrorModal", "Role is missing or not selected")
        }
        await fetch(
            user ? `${process.env.NEXT_PUBLIC_HOST}/api/user/${user.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/user`,
            {
                body: JSON.stringify(data),
                method: user ? "PUT" : "POST",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                if (response.ok) {
                    if (router.pathname === "/profiles/[id]") eventBus.dispatch("refreshData")
                    router.replace(router.asPath)
                    close()
                } else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center gap-3 flex-wrap text-2xl font-bold text-white">
                    <span>{user ? `Update ${user.name} ${user.surname}` : 'Create User'}</span>
                    <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                        <button
                            className="btn btn-sm btn-error text-white"
                            onClick={() => close()}
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-sm btn-success text-white"
                            onClick={() => saveOrUpdate()}
                        >
                            {user ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        autoComplete="name"
                        className="input input-bordered w-full text-white"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Surname</span>
                    </label>
                    <input
                        type="text"
                        name="surname"
                        placeholder="surname"
                        autoComplete="surname"
                        className="input input-bordered w-full text-white"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Email</span>
                    </label>
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        autoComplete="email"
                        className="input input-bordered w-full text-white"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Is Active</span>
                    </label>
                    <input
                        type="checkbox"
                        name="active"
                        className="toggle"
                        checked={Boolean(active)}
                        onChange={() => setActive(active ? false : true)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Show Profile</span>
                    </label>
                    <input
                        type="checkbox"
                        name="showProfile"
                        className="toggle"
                        checked={Boolean(showProfile)}
                        onChange={() => setShowProfile(active ? false : true)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Password</span>
                    </label>
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        autoComplete="password"
                        className="input input-bordered w-full text-white"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Role</span>
                    </label>
                    <select
                        className="select select-bordered text-white"
                        value={roleId}
                        onChange={e => setRoleId(Number(e.target.value))}
                    >
                        {roles.map(
                            (role: Role, index: number, array: Role[]) => (
                                <option key={index} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
    )
}