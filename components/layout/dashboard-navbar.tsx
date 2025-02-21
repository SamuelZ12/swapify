"use client";

import { ChevronsDown, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ToggleTheme } from "./toogle-theme";
import { signOutAction } from "@/app/actions";

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/dashboard" className="font-bold text-lg flex items-center mr-6">
          <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-8 h-8 mr-2 border text-white" />
          Swapify
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ToggleTheme />
          <form action={signOutAction}>
            <Button variant="outline" size="sm" type="submit" className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
} 