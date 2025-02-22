import { Star } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "USA",
        text: "LaLa made our family vacation in Rwanda unforgettable. The gorilla trekking experience was even better than we imagined!",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Singapore",
        text: "As a frequent traveler, I've used many booking platforms. LaLa stands out with its unique properties and excellent customer service in Rwanda.",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        location: "Rwanda",
        text: "Hosting on LaLa has been a great experience. The platform is easy to use and has helped me showcase my Rwandan property to the world.",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
    },
]

const Testimonials = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.image || "/placeholder.svg"}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{testimonial.text}</p>
                            <div className="flex items-center">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonials