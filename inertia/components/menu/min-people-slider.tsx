import { useState } from 'react'
import { Slider } from '~/components/ui/slider'

type Props = {
  value: number
  onChange: (value: number) => void
}

export function MinPeopleSlider({ value, onChange }: Props) {
  const [draggingValue, setDraggingValue] = useState<number | null>(null)
  const displayValue = draggingValue ?? value

  return (
    <>
      <Slider
        min={1}
        max={50}
        step={1}
        value={[displayValue]}
        onValueChange={([val]) => setDraggingValue(val)}
        onValueCommit={([val]) => {
          setDraggingValue(null)
          onChange(val)
        }}
        className="mb-2"
        aria-label="Nombre minimum de personnes"
      />
      <p className="text-body-sm text-muted-foreground mt-3">
        {displayValue > 1 ? `${displayValue} personnes minimum` : 'Tous'}
      </p>
    </>
  )
}
