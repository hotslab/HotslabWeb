import { useState } from "react"
import { ProfileExtended, UserExtended, Sex, Country } from "@prisma/client"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Image from "next/image"
import { MdAccountCircle } from "react-icons/md"
import { useRouter } from "next/router"

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

    async function saveOrUpdate() {
        await fetch(
            profile ? `http://localhost:3000/api/profile/${profile.id}` : `http://localhost:3000/api/profile`,
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
                    console.log(selectedImage, "IMAGE")
                    const profileData = (await response.json()).data
                    if (selectedImage) uploadImage(profileData.id)
                    else { close(), router.replace(router.asPath) }
                } else console.error(response.body)
            })
            .catch(error => console.error(error))
    }

    async function uploadImage(id: string) {
        let input = document.querySelector('input[type="file"]') as HTMLInputElement
        if (input && input.files && input.files.length > 0) {
            let data = new FormData()
            data.append('file', input.files[0])
            data.append('profileId', id)

            await fetch(`http://localhost:3000/api/profile/image/${id}`, {
                method: 'POST',
                body: data
            }).then(response => {
                if (response.ok) {
                    setSelectedImage("")
                    router.replace(router.asPath)
                    close()
                }
                else console.error(response.body)
            })
        } else console.error("File input is empty")
    }


    return (
        <div className="w-full">
            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-start flex-wrap gap-10">
                <span>
                    {user ? `Update ${user.name} ${user.surname} Profile` : 'Create Profile'}
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
                        {profile ? 'Update' : 'Save'}
                    </button>
                </div>
            </dt>
            <div className="">
                <div className="px-4 py-6 bg-base-100 w-full min-[420px]:w-1/3 lg:w-1/4 mb-5 flex items-center justify-center">
                    {
                        profile?.imageUrl
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
                <input
                    type="file"
                    name="profileImage"
                    className="file-input w-full mb-10"
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                />
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
                    <select
                        className="select select-bordered"
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
    )
}