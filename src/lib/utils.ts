import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SUPABASE_URL = "https://tfzttexdxzntoitefqhs.supabase.co/storage/v1/object/public/videos/";
