'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import google from '@/svgs/google.svg'
import { signIn } from 'next-auth/react'

const appId = process.env.FACEBOOK_CLIENT_ID || ''
const redirectId = process.env.FACEBOOK_CLIENT_SECRET || ''

const FacebookSignInBtn = () => {
  const authUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${stateToken}&scope=public_profile,email,pages_show_list,pages_read_engagement,read_insights,pages_manage_metadata,pages_manage_posts`
  return (
    <Button
      onClick={() => signIn('facebook', { redirect: true, callbackUrl: '/' })}
      variant='default'
      className='mt-4'
    >
      <Image src={google} alt='google' width={24} height={24} />
      <span className='ml-2'>Continue With Facebook</span>
    </Button>
  )
}

export default FacebookSignInBtn
