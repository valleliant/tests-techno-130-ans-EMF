/**
 * Lib utils: utilitaires d'UI.
 *
 * Rôle:
 * - Fournit `cn` (className) qui fusionne intelligemment les classes Tailwind.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
