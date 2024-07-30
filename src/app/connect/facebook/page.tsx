'use client'
import FacebookSignInBtn from '@/components/fb-signin'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SignIn = () => {
  const router = useRouter()
  useEffect(() => {
    const storedToken = localStorage.getItem('facebookAccessToken')
    if (storedToken) {
      router.push('/')
    }
  }, [router])
  return (
    <div className='w-full h-screen flex'>
      <div className='md:w-1/2 w-full flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <div className='py-3'>
            <h1 className='text-3xl px-2 font-bold text-center max-w-xl'>
              Welcome to Facebook Custom Dashboard
            </h1>
            <p className='text-sm mt-4 text-black/60 dark:text-white/60 text-center max-w-96 px-2 mx-auto'>
              This is an Assignment.
            </p>
          </div>
          <FacebookSignInBtn />
        </div>
      </div>
      <div className='md:block w-1/2 dark:bg-white bg-black hidden'>
        <div className='w-full h-full flex justify-center items-center'>
          <h1 className='dark:text-black text-white font-bold text-4xl'>
            Web-Mojo
          </h1>
        </div>
      </div>
    </div>
  )
}

export default SignIn
