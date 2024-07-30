'use client'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

type val = {
  value: number
  end_time: string
}

export function ChartComponent({
  title,
  desc,
  data
}: {
  title: string
  desc: string
  data: val[]
}) {
  return (
    <Card className='max-w-xs w-full'>
      <CardHeader>
        <CardTitle className='text-base truncate'>{title}</CardTitle>
        <CardDescription className='text-sm'>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='end_time'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(dateString: string) => {
                const date = new Date(dateString)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey='value'
              type='natural'
              stroke='var(--color-desktop)'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartComponent
