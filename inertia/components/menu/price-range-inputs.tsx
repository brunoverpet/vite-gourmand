import { Input } from '~/components/ui/input'

type Props = {
  priceMin: string
  priceMax: string
  onPriceMinChange: (value: string) => void
  onPriceMaxChange: (value: string) => void
}

export function PriceRangeInputs({ priceMin, priceMax, onPriceMinChange, onPriceMaxChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <p className="text-body-sm text-muted-foreground mb-1">Min</p>
        <Input
          type="number"
          placeholder="0€"
          value={priceMin}
          onChange={(e) => onPriceMinChange(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <p className="text-body-sm text-muted-foreground mb-1">Max</p>
        <Input
          type="number"
          placeholder="200€"
          value={priceMax}
          onChange={(e) => onPriceMaxChange(e.target.value)}
        />
      </div>
    </div>
  )
}
