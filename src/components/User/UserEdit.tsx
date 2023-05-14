import { useState } from "react"
import { Role, UserExtended } from "@prisma/client"
import { useRouter } from "next/router"

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
                else console.error(response.body)
            })
    }

    return (
        <div className="w-full">
            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                <span className="text-lg">
                    {user ? `Update ${user.name} ${user.surname}` : 'Create ser'}
                </span>
                <div className="flex justify-between items-start flex-wrap gap-10">
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
            </dt>
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