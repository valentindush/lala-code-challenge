import { Search } from "lucide-react"

const Hero = () => {
    return (
        <div className="relative h-[600px]">
            <img
                src="https://a0.muscache.com/im/pictures/65ce0dad-ab31-494e-afc5-8a8308ef0345.jpg?im_w=1200&im_format=avif"
                alt="Beautiful view of Kigali, Rwanda"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-5xl font-bold mb-6">Discover Rwanda's Hidden Gems</h1>
                        <p className="text-xl mb-8">
                            Explore unique accommodations and experiences across the Land of a Thousand Hills
                        </p>
                        <div className="bg-white rounded-full p-2 shadow-lg max-w-xl">
                            <div className="flex items-center">
                                <div className="flex-1 px-4">
                                    <input
                                        type="text"
                                        placeholder="Where in Rwanda do you want to go?"
                                        className="w-full py-2 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                                    />
                                </div>
                                <button className="px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition duration-300">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero