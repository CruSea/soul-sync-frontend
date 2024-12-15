import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFallBack(fullName: string) {
  // takes in a name and returns its initals
	return fullName.split(" ").map(word => word.charAt(0).toUpperCase()).join("")
} 