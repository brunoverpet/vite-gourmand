import type { Data } from '@generated/data'

type SelectedFilter = { label: string; type: 'diet' | 'theme' }

export type FiltersDesktopProps = {
  diets: Data.Menus.Diet[]
  themes: Data.Menus.Theme[]
  selectedDiets: string[]
  selectedThemes: string[]
  selectedFilters: SelectedFilter[]
  onToggleDiet: (label: string) => void
  onToggleTheme: (label: string) => void
  onRemoveFilter: (type: 'diet' | 'theme', label: string) => void
  onReset: () => void
}

export default function FiltersDesktop(_props: FiltersDesktopProps) {
  return null
}
