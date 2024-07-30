'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import fb from '@/svgs/fb.svg'
import { useFacebook } from './fb-session'

const FacebookSignInBtn = () => {
  const { connectApp } = useFacebook()
  return (
    <Button onClick={() => connectApp()} variant='default' className='mt-4'>
      <Image src={fb} alt='fb' width={24} height={24} />
      <span className='ml-2'>Continue With Facebook</span>
    </Button>
  )
}

export default FacebookSignInBtn
