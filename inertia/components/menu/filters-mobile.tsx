import type { Data } from '@generated/data'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'

type SelectedFilter = { label: string; type: 'diet' | 'theme' }

type FiltersMobileProps = {
  diets: Data.Menus.Diet[]
  themes: Data.Menus.Theme[]
  selectedDiets: string[]
  selectedThemes: string[]
  selectedFilters: SelectedFilter[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onToggleDiet: (label: string) => void
  onToggleTheme: (label: string) => void
  onRemoveFilter: (type: 'diet' | 'theme', label: string) => void
  onReset: () => void
}

export default function FiltersMobile({
  diets,
  themes,
  selectedDiets,
  selectedThemes,
  selectedFilters,
  open,
  onOpenChange,
  onToggleDiet,
  onToggleTheme,
  onRemoveFilter,
  onReset,
}: FiltersMobileProps) {
  const [exiting, setExiting] = useState<Set<string>>(new Set())

  function handleRemove(type: 'diet' | 'theme', label: string) {
    const key = `${type}-${label}`
    setExiting((prev) => new Set(prev).add(key))
    setTimeout(() => {
      setExiting((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
      onRemoveFilter(type, label)
    }, 200)
  }

  return (
    <div className="md:hidden mt-6">
      <div className="flex flex-col items-end gap-3">
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter />
              Filtres {selectedFilters.length > 0 && `(${selectedFilters.length})`}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl">
            <SheetHeader className="px-6 pt-6">
              <SheetTitle>Filtres</SheetTitle>
            </SheetHeader>

            <div className="px-6 flex flex-col gap-6 mt-4">
              <div>
                <p className="text-label-caps text-muted-foreground mb-3">Régime</p>
                <div className="flex flex-wrap gap-2">
                  {diets.map((diet) => (
                    <Badge
                      key={diet.id}
                      variant={selectedDiets.includes(diet.label) ? 'default' : 'outline'}
                      className="px-4 py-4 cursor-pointer"
                      onClick={() => onToggleDiet(diet.label)}
                    >
                      {diet.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-label-caps text-muted-foreground mb-3">Thème</p>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <Badge
                      key={theme.id}
                      variant={selectedThemes.includes(theme.label) ? 'default' : 'outline'}
                      className="px-4 py-4 cursor-pointer"
                      onClick={() => onToggleTheme(theme.label)}
                    >
                      {theme.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter className="px-6 pb-8 pt-6">
              <Button variant="outline" onClick={onReset} disabled={selectedFilters.length === 0}>
                Réinitialiser
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div
          className={`grid transition-all duration-300 overflow-hidden ${selectedFilters.length > 0 ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="min-h-0 flex flex-wrap gap-2">
            {selectedFilters.map((f) => {
              const key = `${f.type}-${f.label}`
              return (
                <Badge
                  key={key}
                  className={`px-3 py-4 gap-1 cursor-pointer transition-all duration-200 ${exiting.has(key) ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                  onClick={() => handleRemove(f.type, f.label)}
                >
                  {f.label}
                  <X className="w-3 h-3" />
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
