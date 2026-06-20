import * as React from 'react'
import { cn } from '@/lib/utils'

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'type'>

function PhoneInput({ className, ...props }: PhoneInputProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-full rounded-lg border border-input bg-transparent transition-colors',
        'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
        className
      )}
    >
      <span className="flex items-center gap-1.5 px-2.5 text-sm text-muted-foreground border-r border-input shrink-0 select-none">
        🇫🇷 <span>+33</span>
      </span>
      <input
        type="tel"
        data-slot="input"
        className="flex-1 min-w-0 bg-transparent px-2.5 py-1 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        {...props}
      />
    </div>
  )
}

export { PhoneInput }
