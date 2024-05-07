import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Loader,
  MenuIcon,
  type LucideProps,
  EyeOffIcon,
  EyeIcon,
  MapPin,
  Star,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Icons = {
  menu: MenuIcon,
  logo: () => (
    <Link href={"/"} className="flex items-center gap-2">
      <Image src={"/logo.png"} width={30} height={30} alt="Reviews Hub" />
      <p className="text-xs md:text-sm">R.H</p>
    </Link>
  ),
  spinner: () => <Loader className="animate-spin" />,
  gitHub: GitHubLogoIcon,
  google: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
      {...props}
    >
      <path
        d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  work: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a18.15 18.15 0 0 1-20 0" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  ),
  location: MapPin,
  rating: Star,
  dropReview: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5m-10-5v7"></path>
    </svg>
  ),
};
