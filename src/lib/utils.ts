import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// تبدیل اعداد انگلیسی به فارسی
export function toPersianDigits(input: string | number): string {
  return input.toString().replace(/[0-9]/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) + 1728)
  );
}
