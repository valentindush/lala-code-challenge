import Link from "next/link"
import { Search, User } from "lucide-react"

const Header = () => {
    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center">
                        <span className="text-3xl font-bold text-primary-600">LaLa</span>
                    </Link>

                    <div className="block md:flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search destinations"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <Link
                            href="/auth/login"
                            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition duration-300"
                        >
                            <User className="w-5 h-5" />
                            <span>Sign In</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
