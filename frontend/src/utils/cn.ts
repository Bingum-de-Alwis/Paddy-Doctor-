import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines clsx and tailwind-merge
 * for more efficient class name composition
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}