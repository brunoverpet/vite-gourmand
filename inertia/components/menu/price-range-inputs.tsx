import { Input } from '~/components/ui/input'

type Props = {
  priceMin: string
  priceMax: string
  onPriceMinChange: (value: string) => void
  onPriceMaxChange: (value: string) => void
}

export function PriceRangeInputs({
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <label htmlFor="price-min" className="text-body-sm text-muted-foreground mb-1 block">
          Min
        </label>
        <Input
          id="price-min"
          type="number"
          placeholder="0€"
          value={priceMin}
          onChange={(e) => onPriceMinChange(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <label htmlFor="price-max" className="text-body-sm text-muted-foreground mb-1 block">
          Max
        </label>
        <Input
          id="price-max"
          type="number"
          placeholder="200€"
          value={priceMax}
          onChange={(e) => onPriceMaxChange(e.target.value)}
        />
      </div>
    </div>
  )
}
