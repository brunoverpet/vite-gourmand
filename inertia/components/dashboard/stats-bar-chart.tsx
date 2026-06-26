import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart'

type Props = {
  title: string
  description?: string
  highlight?: string
  data: Record<string, unknown>[]
  dataKey: string
  label: string
  color: string
  valueFormatter?: (value: number) => string
  allowDecimals?: boolean
}

export function StatsBarChart({ title, description, highlight, data, dataKey, label, color, valueFormatter, allowDecimals = true }: Props) {
  const chartConfig = {
    [dataKey]: { label, color },
  } satisfies ChartConfig

  const header = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        {description && <p className="text-muted-foreground text-sm mt-0.5">{description}</p>}
      </div>
      {highlight && (
        <span className="text-2xl font-semibold shrink-0" style={{ color }}>
          {highlight}
        </span>
      )}
    </div>
  )

  if (data.length === 0) {
    return (
      <div className="border rounded-xl p-4 space-y-4">
        {header}
        <p className="text-muted-foreground text-sm py-8 text-center">
          Aucune donnée pour cette période.
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded-xl p-4 space-y-4">
      {header}
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="menuTitle"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={valueFormatter}
            allowDecimals={allowDecimals}
            width={valueFormatter ? 75 : 35}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={valueFormatter ? (value) => valueFormatter(value as number) : undefined}
              />
            }
          />
          <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={4} maxBarSize={48} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
