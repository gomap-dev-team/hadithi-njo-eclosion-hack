import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SUPABASE_URL = "https://tfzttexdxzntoitefqhs.supabase.co/storage/v1/object/public/videos/";

export async function* streamAsyncIterable<T>(stream: ReadableStream<T>) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      console.log(value);
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
