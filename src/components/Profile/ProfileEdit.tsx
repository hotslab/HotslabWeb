import { useState } from "react"
import { ProfileExtended, UserExtended, Sex, Country } from "@prisma/client"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MdAccountCircle } from "react-icons/md"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import dynamic from "next/dynamic"
import Spinner from "@/components/Spinner"

const TinyEditor = dynamic(() => import("@/components/TinyEditor"), { loading: () => <Spinner /> })

type props = { profile: ProfileExtended | null, user: UserExtended | null, countries: Country[], close: Function }

export default function ProfileEdit({ profile, user, countries, close }: props) {
    const [idNumber, setIdNumber] = useState(profile?.idNumber || "")
    const [dob, setDob] = useState(profile ? new Date(profile.dob) : new Date())
    const [sex, setSex] = useState(profile?.sex || "male")
    const [countryCode, setCountryCode] = useState(profile?.countryCode || "")
    const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || "")
    const [address, setAddress] = useState(profile?.address || "")
    const [city, setCity] = useState(profile?.city || "")
    const [country, setCountry] = useState(profile?.country || "")
    const [postcode, setPostcode] = useState(profile?.postcode || "")
    const [summary, setSummary] = useState(profile?.summary || "")
    const [selectedImage, setSelectedImage] = useState("")

    const router = useRouter()

    function getDisplayImage(url: string | null): string | null {
        return url ? `'${process.env.NEXT_PUBLIC_HOST}/${url}'` : null
    }
    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            profile ? `${process.env.NEXT_PUBLIC_HOST}/api/profile/${profile.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/profile`,
            {
                body: JSON.stringify({
                    idNumber: idNumber,
                    dob: dob,
                    sex: sex,
                    countryCode: countryCode,
                    phoneNumber: phoneNumber,
                    address: address,
                    city: city,
                    country: country,
                    postcode: postcode,
                    summary: summary,
                }),
                method: user ? "PUT" : "POST",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                if (response.ok) {
                    const profileData = (await response.json()).data
                    if (selectedImage) uploadImage(profileData.id)
                    else { close(), router.replace(router.asPath) }
                } else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }
    async function uploadImage(id: string) {
        eventBus.dispatch("openLoadingPage", true)
        let input = document.querySelector('input[type="file"]') as HTMLInputElement
        if (input && input.files && input.files.length > 0) {
            let data = new FormData()
            data.append('file', input.files[0])
            data.append('profileId', id)

            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/profile/image/${id}`, {
                method: 'POST',
                body: data
            }).then(async response => {
                if (response.ok) {
                    setSelectedImage("")
                    router.replace(router.asPath)
                    close()
                }
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
        } else {
            eventBus.dispatch("openErrorModal", "File input is empty")
            eventBus.dispatch("openLoadingPage", false)
        }
    }

    return (
        <div className="w-full">
            <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                    <span>{user ? `Update ${user.name} ${user.surname} Profile` : 'Create Profile'}</span>
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
                            {profile ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="p-0 w-full flex items-center justify-start">
                    {
                        profile && profile.imageUrl
                            ? <div
                                title={`${profile.user.name} ${profile.user.surname}`}
                                style={{
                                    backgroundImage: `url(${getDisplayImage(profile.imageUrl)})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                                className="w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] p-0 rounded-full mb-5"
                            >
                            </div>
                            : <MdAccountCircle className="text-[200px] text-success h-[100%] p-0 m-0 mb-5" />
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Profile Image</span>
                    </label>
                    <input
                        type="file"
                        name="profileImage"
                        accept=".png,.jpg,.jpeg,.svg"
                        className="file-input w-full text-white"
                        value={selectedImage}
                        onChange={(e) => setSelectedImage(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">ID Number</span>
                    </label>
                    <input
                        type="text"
                        name="idNumber"
                        placeholder="idNumber"
                        autoComplete="idNumber"
                        className="input input-bordered w-full text-white"
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
                        className="input input-bordered w-full text-white"
                        selected={dob}
                        onChange={(date: Date) => setDob(date)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Sex</span>
                    </label>
                    <select
                        className="select select-bordered text-white"
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
                    <select
                        className="select select-bordered text-white"
                        value={countryCode}
                        onChange={e => setCountryCode(e.target.value as Sex)}
                    >
                        {countries.map(
                            (country: Country, index: number, array: Country[]) => (

                                <option key={index} value={country.diallingCode as string}>
                                    {country.name} ({country.diallingCode})
                                </option>
                            ))}
                    </select>
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
                        className="input input-bordered w-full text-white"
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
                        className="input input-bordered w-full text-white"
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
                        className="input input-bordered w-full text-white"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Country</span>
                    </label>
                    <select
                        className="select select-bordered text-white"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    >
                        {
                            countries.map((country: Country, index: number, array: Country[]) => (

                                <option key={index} value={country.name}>{country.name}</option>
                            ))
                        }
                    </select>
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
                        className="input input-bordered w-full text-white"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-gray-600">Summary</span>
                    </label>
                    <TinyEditor
                        content={summary}
                        onChange={(e: string) => setSummary(e)}
                    />
                </div>
            </div>
        </div>
    )
}