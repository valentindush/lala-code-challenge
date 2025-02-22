import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Safety Information
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Cancellation Options
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    COVID-19 Response
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Community</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Forum
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Refer a Friend
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Hosting</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Try Hosting
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Community Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Responsible Hosting
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-gray-900">
                                    Policies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} LaLa. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer