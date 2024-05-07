import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
const PasswordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
  );

export const validatePassword = (password: string): boolean => {
  try {
    PasswordSchema.parse(password);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  try {
    z.string().email().parse(email);
    return true;
  } catch (error) {
    return false;
  }
};

interface ErrorData {
  message: string;
  validationErrors?: string | [string] | [{ description: string }];
}
export const displayQueryError = (errorData: AxiosError<ErrorData>) => {
  const { message, validationErrors } = errorData.response?.data || {};

  let errorMsg: string = "";

  if (validationErrors) {
    if (typeof validationErrors === "string") {
      errorMsg = validationErrors;
    } else if (Array.isArray(validationErrors)) {
      if (typeof validationErrors[0] === "string") {
        [errorMsg] = validationErrors;
      } else if ("description" in validationErrors[0]) {
        errorMsg = validationErrors[0].description;
      }
    }
  } else {
    errorMsg = message as string;
  }

  toast({
    variant: "destructive",
    description: errorMsg,
  });
};

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";

  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (iso: string) => {
  // const date = new Date(iso);
  // const day = date.getDate();
  // const year = date.getFullYear();
  // const ordinal = nthNumber(date.getDate());
  // const month = date.toLocaleDateString("en-US", { month: "short" });

  // return `${month} ${day}${ordinal}, ${year}`;
  const date = new Date(iso);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - date.getTime());
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const year = date.getFullYear();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();

  if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours < 24) {
    return `${hours} hr${hours !== 1 ? "s" : ""}`;
  } else if (days < 365) {
    return `${month} ${day}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
};


export function returnRandomItem(item: string[]) {
  const randomIndex = Math.floor(Math.random() * item.length);
  return item[randomIndex];
}