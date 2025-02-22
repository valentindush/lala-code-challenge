import { Users } from "lucide-react"
import axios from "@/lib/axios"
import { useEffect, useState } from "react"
import PropertyItem from "@/app/host/components/property-item"
import { Property } from "@/app/lib/@types"
import Link from "next/link"

const FeaturedListings = () => {
    const [properties, setProperties] = useState<Property[]>([])

    const fetchProperties = async () => {
        try {
            const response = await axios.get("/public/properties")
            console.log(response)
            setProperties(response.data.slice(0, 6))
        } catch (error) {
            console.error("Error fetching properties:", error)
        }
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Places to Stay</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property, i) => (
                    <Link key={'index'} href={"/auth/login"}>
                        <PropertyItem key={property.id} {...property} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FeaturedListings