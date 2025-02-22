import { Property } from "@/app/lib/@types"
import { Edit, Trash, User } from "lucide-react"

const PropertyItem = (property: Property) => {

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{property.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{property.location}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary-300">
                        RWF {property.price}
                        <span className="text-sm text-gray-500 font-normal"> / night</span>
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span>{property.guests} guests</span>
                    </div>
                </div>
            </div>
            {/* <div className="px-4 py-3 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className={`px-2 py-1 capitalize text-xs font-medium ${!property.booked ? "text-green-700 bg-green-100" : "text-yellow-700 bg-yellow-100"} rounded-full`}>
                        {property.booked ? "Booked" : "Available"}
                    </span>
                </div>
            </div> */}
        </div>
    )
}

export default PropertyItem