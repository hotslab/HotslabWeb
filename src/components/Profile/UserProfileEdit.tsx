import {
    Achievement,
    Education,
    Experience,
    Interest,
    Link,
    ProfileExtended,
    ProjectClientExtended,
    ProjectExtended,
    ProjectSkillExtended,
    Sex,
    SkillExtended
} from "@prisma/client"
import Image from "next/image"
import { MdAccountCircle } from "react-icons/md"
import { format } from 'date-fns'
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


type Props = {
    profile: ProfileExtended
    skills: SkillExtended[]
}

export default function UserProfileEdit({ profile, skills }: Props) {
    // User
    const [email, setEmail] = useState(profile.user.email || "")
    const [password, setPassword] = useState("")
    const [name, setName] = useState(profile.user.name || "")
    const [surname, setSurname] = useState(profile.user.surname || "")
    const [active, setActive] = useState(Boolean(profile.user.active) || false)
    const [showProfile, setShowProfile] = useState(Boolean(profile.user.showProfile) || false)
    // Profile
    const [idNumber, setIdNumber] = useState(profile.idNumber || "")
    const [dob, setDob] = useState(new Date(profile.dob) || new Date())
    const [sex, setSex] = useState(profile.sex || "male")
    const [countryCode, setCountryCode] = useState(profile.countryCode || "")
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || "")
    const [address, setAddress] = useState(profile.address || "")
    const [city, setCity] = useState(profile.city || "")
    const [country, setCountry] = useState(profile.country || "")
    const [postcode, setPostcode] = useState(profile.postcode || "")
    const [summary, setSummary] = useState(profile.summary || "")

    return (
        <div>
            <div className="px-4 py-6 bg-base-100 w-full min-[420px]:w-1/3 lg:w-1/4 mb-5 flex items-center justify-center">
                {
                    profile.imageUrl
                        ? <Image
                            src={profile.imageUrl}
                            alt={`${profile.user.name} ${profile.user.surname}`}
                            width={200}
                            height={200}
                            className="mask mask-circle"
                        />
                        : <MdAccountCircle className="text-[200px] h-[100%]" />
                }
            </div>
            <input type="file" className="file-input w-full max-w-xs mb-10" />
            <div className="mt-6 mb-10 flex flex-col sm:flex-row justify-between items-start gap-10">
                <div className="w-full sm:1/2">
                    <dt className="font-medium text-gray-900 mb-5">User</dt>
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
                    </div>
                </div>
                <div className="w-full sm:1/2">
                    <dt className="font-medium text-gray-900 mb-5">Profile</dt>
                    <div className="">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">ID Number</span>
                            </label>
                            <input
                                type="text"
                                name="idNumber"
                                placeholder="idNumber"
                                autoComplete="idNumber"
                                className="input input-bordered w-full"
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Date Of Birth</span>
                            </label>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                className="input input-bordered w-full"
                                selected={dob}
                                onChange={(date: Date) => setDob(date)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Sex</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={sex}
                                onChange={e => setSex(e.target.value as Sex)}
                            >
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Country Code</span>
                            </label>
                            <input
                                type="text"
                                name="countryCode"
                                placeholder="countryCode"
                                autoComplete="countryCode"
                                className="input input-bordered w-full"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="phoneNumber"
                                autoComplete="phoneNumber"
                                className="input input-bordered w-full"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="address"
                                autoComplete="address"
                                className="input input-bordered w-full"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">City</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                placeholder="city"
                                autoComplete="city"
                                className="input input-bordered w-full"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Country</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                placeholder="country"
                                autoComplete="country"
                                className="input input-bordered w-full"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Post Code</span>
                            </label>
                            <input
                                type="text"
                                name="postcode"
                                placeholder="postcode"
                                autoComplete="postcode"
                                className="input input-bordered w-full"
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Summary</span>
                            </label>
                            <textarea
                                name="summary"
                                placeholder="summary"
                                className="textarea textarea-bordered"
                                cols={30}
                                rows={5}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}