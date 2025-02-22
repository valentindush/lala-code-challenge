const destinations = [
    {
        id: 1,
        name: "Kigali",
        image:
            "https://deih43ym53wif.cloudfront.net/cityscape-things-to-do-in-kigali-rwanda_44e57bd0bf.jpeg",
    },
    {
        id: 2,
        name: "Volcanoes National Park",
        image:
            "https://www.volcanoesparkrwanda.org/wp-content/uploads/2021/02/History-of-Volcanoes-National-750x450.jpg",
    },
    {
        id: 3,
        name: "Nyungwe National Park",
        image:
            "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
        id: 4,
        name: "Akagera National Park",
        image:
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
]

const Destinations = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {destinations.map((destination) => (
                    <div key={destination.id} className="relative group overflow-hidden rounded-lg">
                        <img
                            src={destination.image || "/placeholder.svg"}
                            alt={destination.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h3 className="text-white text-2xl font-bold">{destination.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Destinations