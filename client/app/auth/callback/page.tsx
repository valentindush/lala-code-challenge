import { Suspense } from "react"
import AuthCallbackContent from "./callbackContent"
import { Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthCallbackContent />
    </Suspense>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary-300" />
    </div>
  )
}

