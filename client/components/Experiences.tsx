import { Users } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    location: "Volcanoes National Park, Rwanda",
    guests: 6,
    price: 1500000,
    image:
      "https://www.rwandagorillatrek.com/wp-content/uploads/2022/04/Photos-of-Volcanoes-National-Park.jpg",
  },
  {
    id: 2,
    title: "Nyungwe Forest Canopy Walk",
    location: "Nyungwe National Park, Rwanda",
    guests: 10,
    price: 500000,
    image:
      "https://visitnyungwe.org/wp-content/uploads/sites/5/2023/10/canopy_walk.jpg",
  },
  {
    id: 3,
    title: "Lake Kivu Boat Tour",
    location: "Gisenyi, Rwanda",
    guests: 8,
    price: 300000,
    image:
      "https://www.safarisrwandasafari.com/wp-content/uploads/2023/03/lake-kivu-rwanda.jpg",
  },
]

const Experiences = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Unforgettable Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-xl overflow-hidden shadow-md group">
              <div className="relative">
                <img
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">{experience.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-2">{experience.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-primary-600 mr-1" />
                    <span>Up to {experience.guests} guests</span>
                  </div>
                  <p className="text-gray-900">
                    <span className="font-bold">{experience.price.toLocaleString()} RWF</span> / person
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experiences