import { useState } from "react"
import { Role, UserExtended } from "@prisma/client"
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
        await fetch(
            user ? `http://localhost:3000/api/user/${user.id}` : `http://localhost:3000/api/user`,
            {
                body: JSON.stringify({
                    // id: user?.id,
                    email: email,
                    password: password,
                    name: name,
                    surname: surname,
                    active: active,
                    showProfile: showProfile,
                    roleId: roleId
                }),
                method: user ? "PUT" : "POST",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else eventBus.dispatch("openErrorModal", response.body)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
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
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Role</span>
                    </label>
                    <select
                        className="select select-bordered"
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