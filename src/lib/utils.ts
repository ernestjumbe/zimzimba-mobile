import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function for merging className strings
 * Used for combining Tailwind CSS classes (NativeWind)
 * @param inputs - Class names to merge
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
