import Image from "next/image"
import Router from "next/router";
import Layout from "@/components/Layout"
import UserProfile from '@/components/UserProfile'
import { Profile } from "../../../types"

// const profiles: Profile[] = [
//     {
//         id: 1,
//         userId: 1,
//         idNumber: 'bn5563228827',
//         summary: `A well seasoned and experienced full stack software developer, with over 5 years 
//                     of commercial working experience in the industry.`,
//         createdAt: '2023-01-23T13:23Z',
//         updatedAt: '2023-01-23T13:23Z',
//         name: 'Leslie',
//         surname: 'Alexander',
//         email: 'leslie.alexander@example.com',
//         imageUrl:
//             'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         dob: "07-03-1989",
//         countryCode: 263,
//         phoneNumber: 779101562,
//         address: "Mabelreign",
//         city: "Harare",
//         country: "Zimbabwe",
//         postcode: '0000',

//     },
//     {
//         id: 2,
//         userId: 1,
//         idNumber: 'bn5563228827',
//         summary: `A well seasoned and experienced full stack software developer, with over 5 years 
//                     of commercial working experience in the industry.`,
//         createdAt: '2023-01-23T13:23Z',
//         updatedAt: '2023-01-23T13:23Z',
//         name: 'Leslie',
//         surname: 'Alexander',
//         email: 'leslie.alexander@example.com',
//         imageUrl:
//             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         dob: "07-03-1989",
//         countryCode: 263,
//         phoneNumber: 779101562,
//         address: "Mabelreign",
//         city: "Harare",
//         country: "Zimbabwe",
//         postcode: '0000',

//     },
//     {
//         id: 3,
//         userId: 1,
//         idNumber: 'bn5563228827',
//         summary: `A well seasoned and experienced full stack software developer, with over 5 years 
//                     of commercial working experience in the industry.`,
//         createdAt: '2023-01-23T13:23Z',
//         updatedAt: '2023-01-23T13:23Z',
//         name: 'Leslie',
//         surname: 'Alexander',
//         email: 'leslie.alexander@example.com',
//         imageUrl:
//             'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         dob: "07-03-1989",
//         countryCode: 263,
//         phoneNumber: 779101562,
//         address: "Mabelreign",
//         city: "Harare",
//         country: "Zimbabwe",
//         postcode: '0000',

//     },
// ]

type Props = { profiles: Profile[] }

export default function Profiles(props: Props) {

    console.log('PROPS DATA', props.profiles)

    return (
        <Layout>
            <div className="bg-white px-8">
                <div className="container min-h-screen mx-auto px-4 pt-10">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {props.profiles.length > 1 ? 'Profiles' : 'Profile'}
                    </h2>
                    {props.profiles.length > 0 ?

                        props.profiles.length > 1 ?
                            <ul role="list" className="divide-y divide-gray-100">
                                {props.profiles.map((profile) => (
                                    <li key={profile.id} className="flex justify-between gap-x-6 py-5" onClick={() => Router.push({
                                        pathname: `/profile/${profile.id}`, query: { data: encodeURIComponent(JSON.stringify(profile)) }
                                    })}>
                                        <div className="flex gap-x-4" >
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={profile.imageUrl} alt="" />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{profile.name}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{profile.email}</p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                DOB {profile.dob}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul> :
                            <UserProfile profile={props.profiles[0]} />
                        : <div><p className="text-primary">No data</p></div>
                    }
                </div>
            </div>
        </Layout >
    )
}


// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
    const profiles = (await response.json()).data

    console.log('initial data', profiles)

    // Pass data to the page via props
    return { props: { profiles } }
}