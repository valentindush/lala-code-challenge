export type Property = {
    id: string
    title: string
    description: string
    price: number
    location: string
    image: string,
    imageUrl: string
    guests: number
    booked: boolean
}

export type User = {
    id: string
    email: string
    name: string
}

export type Booking = {
    id: string
    checkIn: Date
    checkOut: Date
    renterId: string
    renter: User
    status: "PENDING" | "CONFIRMED" | "CANCELLED"
    property: Property
    propertyId: string
    createdAt: Date
    updatedAt: Date
}