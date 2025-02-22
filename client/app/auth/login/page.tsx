"use client"

import { useAuth } from '@/app/providers/auth'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState('')
  const [step, setStep] = useState('role')
  const { login, isLoading, user } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (user) {
      router.push(`${user.role == "HOST"? "/host/properties": "/bookings"}`)
    }
    
    const savedRole = localStorage.getItem('selected_role')
    if (savedRole) {
      setSelectedRole(savedRole)
    }
  }, [user, router])

  const handleRoleSelect = (role: React.SetStateAction<string>) => {
    setSelectedRole(role)
  }

  const handleContinue = () => {
    if (selectedRole) {
      setStep('signin')
    }
  }

  const handleBack = () => {
    setStep('role')
  }

  const handleLogin = () => {
    login(selectedRole)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="text-3xl font-bold text-primary-500">LaLa</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome to LaLa
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Find your perfect stay or become a host
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'role' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-center text-lg font-medium text-gray-900 mb-4">
                  How would you like to use LaLa?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('renter')}
                    className={`relative w-full rounded-lg border ${
                      selectedRole === 'renter' 
                        ? 'border-primary-300 ring-2 ring-primary-300' 
                        : 'border-gray-300'
                    } bg-white p-4 cursor-pointer hover:border-primary-300 focus:outline-none`}
                  >
                    <span className="text-sm font-medium text-gray-900">Renter</span>
                    <span className="block mt-1 text-xs text-gray-500">Find and book properties</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('host')}
                    className={`relative w-full rounded-lg border ${
                      selectedRole === 'host' 
                        ? 'border-primary-300 ring-2 ring-primary-300' 
                        : 'border-gray-300'
                    } bg-white p-4 cursor-pointer hover:border-primary-300 focus:outline-none`}
                  >
                    <span className="text-sm font-medium text-gray-900">Host</span>
                    <span className="block mt-1 text-xs text-gray-500">List your properties</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedRole}
                className={`w-full rounded-md px-3 py-4 text-sm font-semibold text-white shadow-sm focus:outline-offset-0 transition-colors duration-200 ${
                  selectedRole 
                    ? 'bg-primary-300 hover:bg-primary-400' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center">
                <button
                  onClick={handleBack}
                  className="text-primary-400 hover:text-primary-500 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Sign in as a {selectedRole}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleLogin} 
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 rounded-md bg-primary-300 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus:outline-offset-0 transition-colors duration-200"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Sign in with Google
                  </>
                )}
              </button>

              <p className="mt-2 text-xs text-center text-gray-500">
                By signing in, you agree to our{' '}
                <Link href="#" className="text-primary-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-primary-400 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignIn