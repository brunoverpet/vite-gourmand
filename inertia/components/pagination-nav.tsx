import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

type Props = {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

function getPageRange(current: number, last: number): (number | null)[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1)

  const pages: (number | null)[] = [1]

  if (current > 3) pages.push(null)

  for (let i = Math.max(2, current - 1); i <= Math.min(last - 1, current + 1); i++) {
    pages.push(i)
  }

  if (current < last - 2) pages.push(null)

  pages.push(last)

  return pages
}

export default function PaginationNav({ currentPage, lastPage, onPageChange }: Props) {
  if (lastPage <= 1) return null

  const pages = getPageRange(currentPage, lastPage)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 py-1 text-body-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeftIcon className="size-4" />
        <span className="hidden sm:inline">Précédent</span>
      </button>

      {/* Mobile: page X / Y */}
      <span className="px-4 text-body-sm text-muted-foreground sm:hidden">
        {currentPage} / {lastPage}
      </span>

      {/* Desktop: numbered pages */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((page, i) =>
          page === null ? (
            <span key={`ellipsis-${i}`} className="flex size-8 items-center justify-center">
              <MoreHorizontalIcon className="size-4 text-muted-foreground" />
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'size-8 text-body-sm transition-colors rounded-sm',
                page === currentPage
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="flex items-center gap-1 px-2 py-1 text-body-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        <span className="hidden sm:inline">Suivant</span>
        <ChevronRightIcon className="size-4" />
      </button>
    </nav>
  )
}
