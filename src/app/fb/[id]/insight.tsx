'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import ChartComponent from './chart'
import { title } from 'process'
import BackBtn from '@/components/back-btn'
import { Undo2 } from 'lucide-react'

type Insight = {
  name: string
  title: string
  values: {
    value: number
    end_time: string
  }[]
}

const Insight = ({ pageId }: { pageId: string }) => {
  const [insights, setInsights] = useState<Insight[] | null>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const accessToken = searchParams.get('pageToken') ?? ''
  const pageName = searchParams.get('pageName') ?? ''
  const getPageInsight = useCallback(
    async ({
      pageId,
      since,
      until,
      period,
      accessToken
    }: {
      pageId: string
      since: string
      until: string
      period: string
      accessToken: string
    }) => {
      const response = await fetch(
        `https://graph.facebook.com/${pageId}/insights/page_follows,page_post_engagements,page_impressions,page_actions_post_reactions_like_total?since=${since}&until=${until}&period=${period}&access_token=${accessToken}`
      )
      const res = await response.json()
      if (!res.data) {
        setInsights(null)
      } else {
        setInsights(res.data)
      }
      setLoading(false)
    },
    []
  )

  useEffect(() => {
    setLoading(true)
    const since = new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split('T')[0]
    const until = new Date().toISOString().split('T')[0]
    const period = 'day'
    getPageInsight({ pageId, since, until, period, accessToken })
  }, [getPageInsight, pageId, accessToken])

  if (loading) {
    return (
      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-[60px] w-[150px] rounded-xl' />
        <Skeleton className='h-[60px] w-[150px] rounded-xl' />
        <Skeleton className='h-[60px] w-[150px] rounded-xl' />
        <Skeleton className='h-[60px] w-[150px] rounded-xl' />
      </div>
    )
  }
  return (
    <div>
      <div className='flex gap-4 justify-center items-center mb-4'>
        <BackBtn icon={<Undo2 size={18} />} />
        <h1 className='text-2xl font-semibold'>{pageName}</h1>
      </div>
      <div className='w-full max-w-4xl flex gap-2 flex-wrap justify-center'>
        {insights
          ? insights.map(({ name, values, title }, index) => {
              return (
                <ChartComponent
                  key={index}
                  data={values}
                  desc={name}
                  title={title}
                />
              )
            })
          : 'Something went wrong. Please try again.'}
      </div>
    </div>
  )
}

export default Insight
