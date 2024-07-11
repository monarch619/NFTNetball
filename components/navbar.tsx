"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";
import * as React from "react";

import { Menu } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function NavBar() {
  return (
    <div className="flex min-w-full items-center justify-between p-2 border-b z-10">
      <Dialog>
        <SheetTrigger className="min-[825px]:hidden p-2 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>NFTNetball</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-3 mt-[1rem]">
            <DialogClose asChild>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Play
                </Button>
              </Link>
            </DialogClose>
            <DialogClose asChild>
              <Link href="/shop">
                <Button variant="outline" className="w-full">
                Shop
                </Button>
              </Link>
            </DialogClose>
          </div>
        </SheetContent>
      </Dialog>
      <Link href="/" className="pl-2">
        NFTNetball
      </Link>
      <NavigationMenu className="">
        <NavigationMenuList className="max-[825px]:hidden ">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref className="cursor-pointer">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Play
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/shop"
              legacyBehavior
              passHref
              className="cursor-pointer"
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Shop
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-3">
        <ConnectWallet
          btnTitle="Get Started"
          style={{ backgroundColor: "lightpink" }}
        />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
