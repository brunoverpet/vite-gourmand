import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function imageUrl(photoPath: string | null | undefined): string | null {
  if (!photoPath) return null
  if (photoPath.startsWith('http')) return photoPath
  return `/uploads/${photoPath}`
}
