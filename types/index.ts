export type User = {
    id: number
    email: string
    password: string
    name: string
    surname: string
    roleId: number
    active: boolean
    showProfile: boolean
    createdAt: Date
    updatedAt: Date
}

export type Profile = {
    id: number
    userId: number
    idNumber: string | null
    dob: string | null
    countryCode: number | null
    phoneNumber: number | null
    address: string | null
    city: string | null
    country: string | null
    postcode: string | null
    summary: string | null
    createdAt: string
    updatedAt: string
    name: string
    surname: string
    email: string
    imageUrl: string
}