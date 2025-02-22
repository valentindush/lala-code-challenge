import Link from "next/link"

const HostCTA = () => {
    return (
        <div className="bg-primary-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ready to Host Your Place?</h2>
                        <p className="mt-3 text-xl text-gray-600">
                            Join thousands of hosts and start earning by sharing your space with travelers from around the world.
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-400 hover:bg-primary-500"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0 lg:ml-8">
                        <img
                            className="w-full max-w-sm rounded-lg shadow-lg"
                            src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                            alt="Become a host"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostCTA