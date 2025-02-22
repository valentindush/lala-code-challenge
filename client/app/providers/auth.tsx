'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/lib/axios'

type User = {
  id: string
  name: string
  email: string
  imageUrl?: string
  role?: 'RENTER' | 'HOST'
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (role: string) => void
  logout: () => Promise<void>
  updateUserRole: (role: 'RENTER' | 'HOST') => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Extract token from URL if present (for handling redirects)
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [])

  const getUser = useCallback(async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setUser(null)
        setIsLoading(false)
        return
      }

      const { data } = await axiosInstance.get('/auth/user')
      setUser(data)
    } catch (error) {
      console.error('Failed to fetch user', error)
      localStorage.removeItem('auth_token')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getUser()

    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data?.type === 'AUTH_SUCCESS' && event.data?.token) {
        localStorage.setItem('auth_token', event.data.token)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${event.data.token}`
        getUser()
        router.refresh()
      }
    }

    window.addEventListener('message', messageListener)
    return () => window.removeEventListener('message', messageListener)
  }, [getUser, router])

  const login = (role: string) => {
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    localStorage.setItem('selected_role', role)

    const popup = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google?role=${role.toLowerCase()}`,
      'google-auth',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed)
      }
    }, 500)
  }

  const updateUserRole = async (role: 'RENTER' | 'HOST') => {
    try {
      const { data } = await axiosInstance.patch('/auth/update-role', { role })
      setUser(prev => prev ? { ...prev, role } : null)
      return data
    } catch (error) {
      console.error('Failed to update user role', error)
      throw error
    }
  }

  const logout = async () => {
    localStorage.removeItem('auth_token')
    delete axiosInstance.defaults.headers.common['Authorization']
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}