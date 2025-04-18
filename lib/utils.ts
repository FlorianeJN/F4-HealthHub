import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//export function formatDate(date: string | Date) {
// return new Intl.DateTimeFormat("fr-CA", {
//   year: "numeric",
//   month: "long",
//    day: "numeric",
//  }).format(new Date(date));
//}
