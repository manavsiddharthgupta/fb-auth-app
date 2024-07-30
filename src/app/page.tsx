'use client'
import { useFacebook } from '@/components/fb-session'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

type User = {
  id: string
  name: string
  picture: string
  accessToken: string
}

type FBPage = {
  id: string
  name: string
  access_token: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>()
  const [fbpages, setPages] = useState<FBPage[] | null>([])
  const [loading, setStatus] = useState(true)
  const { accessToken } = useFacebook()

  useEffect(() => {
    const fetchUserProfile = async (accessToken: string) => {
      try {
        setStatus(true)
        const userIdRes = await fetch(
          `https://graph.facebook.com/me?access_token=${accessToken}`
        )

        const usersDataRes = await fetch(
          `https://graph.facebook.com/v20.0/me?fields=id,name,picture&access_token=${accessToken}`
        )

        if (!usersDataRes.ok && !userIdRes.ok) {
          throw new Error('Something Went Wrong While Fetching Users Data')
        }
        const dataForResponseFields = await usersDataRes.json()
        const dataForResponseUserID = await userIdRes.json()
        const pagesDataRes = await fetch(
          `https://graph.facebook.com/v20.0/${dataForResponseUserID.id}/accounts?access_token=${accessToken}`
        )
        const dataForPages = await pagesDataRes.json()
        if (!pagesDataRes.ok) {
          throw new Error('Something Went Wrong While Fetching Pages Data')
        }
        setUser({
          id: dataForResponseUserID.id,
          name: dataForResponseFields.name,
          picture: dataForResponseFields.picture.data.url,
          accessToken
        })
        setPages(dataForPages.data)
        setStatus(false)
      } catch (error) {
        console.error('Error fetching', error)
        setUser(null)
        setPages(null)
        setStatus(false)
        throw error
      }
    }

    if (accessToken) {
      fetchUserProfile(accessToken)
    }
  }, [accessToken])

  if (loading) {
    return (
      <main className='flex items-center justify-center min-h-screen'>
        <div className='flex flex-col space-y-3'>
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      </main>
    )
  }
  return (
    <main className='flex items-center justify-center min-h-screen py-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-center space-x-4'>
          <Avatar>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <h4 className='text-lg font-semibold'>{user?.name}</h4>
        </div>
        <FbCrousel pages={fbpages} />
      </div>
    </main>
  )
}

function FbCrousel({ pages }: { pages: FBPage[] | null }) {
  return (
    <div className='flex gap-4 flex-wrap max-w-3xl justify-center'>
      {pages && pages.length > 0 ? (
        pages?.map(({ id, name, access_token }, index) => (
          <Link
            key={id}
            href={`/fb/${id}?pageToken=${access_token}&pageName=${name}`}
            className=''
          >
            <Card className='rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer'>
              <CardContent className='flex items-center justify-center px-4 py-2.5'>
                <span className='text-lg font-medium'>{name}</span>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <p>No Pages Available</p>
      )}
    </div>
  )
}
