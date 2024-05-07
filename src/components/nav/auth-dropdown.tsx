import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import LogoutButton from "../logout";

type User =
  | {
      profile: {
        user_name: string;
      } | null;
      id: string;
      email: string | null;
      image: string | null;
    }
  | null
  | undefined;

export default function AuthUserDropdown({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.image!} />
          <AvatarFallback className="uppercase">
            {user && user.email?.charAt(0)}
            {user && user.email?.charAt(1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuLabel>
          <p>My Account</p>
          <p>{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${user?.profile?.user_name}`}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/settings`}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
