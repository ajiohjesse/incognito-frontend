import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleQueryError(error: unknown) {
  if (isAxiosError(error)) {
    toast.error(error.response?.data?.message || error.message);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error("Something went wrong");
}

export function formatDate(utcTime: string): string {
  const date = new Date(utcTime);

  // Convert to UTC+1 by adding 1 hour
  date.setHours(date.getHours() + 1);

  // Format the date using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-NG", {
    timeZone: "Africa/Lagos", // Set the time zone to Africa/Lagos
    dateStyle: "medium", // Medium date style (e.g., "Feb 9, 2025")
    timeStyle: "short", // Short time style (e.g., "10:09 PM")
    hour12: true, // Use 12-hour format
  });

  // Format the date and time
  const formattedDateTime = formatter.format(date);

  return formattedDateTime;
}

export const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};
