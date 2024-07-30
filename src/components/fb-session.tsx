'use client'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback
} from 'react'
import { toast } from 'sonner'

interface FacebookContextType {
  accessToken: string | null
  connectApp: () => void
  removeApp: () => void
}

const FacebookContext = createContext<FacebookContextType | undefined>(
  undefined
)

const appId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ''
const redirectUri = process.env.NEXT_PUBLIC_API_URL || ''
const appSecret = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET || ''

export const FacebookProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('facebookAccessToken')

    if (storedToken && storedToken.length > 0) {
      setAccessToken(storedToken)
    } else {
      router.push('/connect/facebook')
    }
  }, [router])

  const connectApp = () => {
    const stateToken = process.env.NEXTAUTH_SECRET || ''
    const authUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${stateToken}&scope=public_profile,email,pages_show_list,pages_read_engagement,read_insights,pages_manage_metadata,pages_manage_posts`
    window.location.href = authUrl
  }

  const removeApp = () => {
    localStorage.removeItem('facebookAccessToken')
    setAccessToken(null)
  }

  const getAccessToken = useCallback(
    async (code: string) => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error.message)
        }
        setAccessToken(data.access_token)
        localStorage.setItem('facebookAccessToken', data.access_token)
        router.push('/')
      } catch (error) {
        console.error('Error getting access token:', error)
        toast(`${error}`)
      }
    },
    [router]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (code && !accessToken) {
      window.history.replaceState({}, document.title, window.location.pathname)
      getAccessToken(code)
    }
  }, [accessToken, getAccessToken])

  return (
    <FacebookContext.Provider
      value={{
        accessToken,
        connectApp,
        removeApp
      }}
    >
      {children}
    </FacebookContext.Provider>
  )
}

export const useFacebook = () => {
  const context = useContext(FacebookContext)
  if (context === undefined) {
    throw new Error('useFacebook must be used within a FacebookProvider')
  }
  return context
}
