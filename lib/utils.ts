import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function decodeToken(token: string) {
  try {
    return jwtDecode(token); // Returns the decoded payload
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}