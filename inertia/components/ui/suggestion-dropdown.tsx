type Suggestion = { fulltext: string }

type Props<T extends Suggestion> = {
  suggestions: T[]
  onSelect: (s: T) => void
}

export function SuggestionDropdown<T extends Suggestion>({ suggestions, onSelect }: Props<T>) {
  if (suggestions.length === 0) return null

  return (
    <ul className="absolute z-10 top-full mt-1 w-full rounded-lg border border-border bg-background shadow-md overflow-hidden">
      {suggestions.map((s, i) => (
        <li key={`${s.fulltext}-${i}`}>
          <button
            type="button"
            className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
            onMouseDown={(e) => {
              e.preventDefault()
              onSelect(s)
            }}
          >
            {s.fulltext}
          </button>
        </li>
      ))}
    </ul>
  )
}
