"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function AuthCallbackContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const error = searchParams.get("error")
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        if (error) {
            setMessage("Authentication failed. Please try again.")
            window.opener?.postMessage({ type: "AUTH_ERROR", error }, window.location.origin)
            setTimeout(() => window.close(), 2000)
        } else if (token) {
            setMessage("Authentication successful!")
            window.opener?.postMessage({ type: "AUTH_SUCCESS", token }, window.location.origin)
            setTimeout(() => window.close(), 1000)
        }
    }, [token, error])

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            {message && <p className="text-gray-700 font-medium">{message}</p>}
        </div>
    )
}

