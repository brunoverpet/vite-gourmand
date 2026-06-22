import { X } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/utils'

type FilterItem = { id: string | number; label: string }

type Props = {
  items: FilterItem[]
  selected: string[]
  onToggle: (label: string) => void
  badgeClassName?: string
  withHoverEffect?: boolean
}

export function FilterBadgeList({
  items,
  selected,
  onToggle,
  badgeClassName = 'px-3 py-4 cursor-pointer gap-1',
  withHoverEffect = false,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = selected.includes(item.label)
        return (
          <Badge
            key={item.id}
            variant={active ? 'default' : 'outline'}
            className={cn(
              badgeClassName,
              withHoverEffect && (active ? 'hover:bg-primary/80' : 'hover:bg-primary/10 hover:border-primary/30')
            )}
            onClick={() => onToggle(item.label)}
          >
            {item.label}
            {active && <X className="w-3 h-3" />}
          </Badge>
        )
      })}
    </div>
  )
}
