"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, ShoppingCart, UserRound } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { signOut, useSession } from 'next-auth/react'
// import { cartContext } from '@/Services/providers/cart-provider'
import { Spinner } from '../ui/spinner'
import { cartContext } from '@/Services/providers/cart-provider'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"


export default function NavBar() {
    const { data: session, status } = useSession();
    const { noOfCartItems, isLoading } = useContext(cartContext);
    console.log(noOfCartItems);

    console.log(status);
    function LogOutUser() {
        signOut({ callbackUrl: '/login' })
    }

    return (
        <nav className='bg-[#F5F5F5E5] p-5 px-10'>
            <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
                <div className="nav-logo flex items-center gap-1">
                    <Avatar className='bg-black rounded-lg'>

                        <AvatarFallback className=' text-white font-bold'>S</AvatarFallback>
                    </Avatar>
                    <Link href={'/'} className='font-bold text-2xl'>
                        ShopMart
                    </Link>
                </div>
                <div className="nav-links hidden md:block">
                    <NavigationMenu className='flex gap-4'>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/products">Products</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/brands">Brands</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/categories">Categories</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenu>

                </div>
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Menu className="size-6 cursor-pointer" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            <div className="flex flex-col gap-4 mt-10">
                                <Link href="/products">Products</Link>
                                <Link href="/brands">Brands</Link>
                                <Link href="/categories">Categories</Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="nav-actions flex items-center gap-4">

                    <DropdownMenu>
                        <p> Welcome , {session?.user?.name}</p>

                        <DropdownMenuTrigger asChild>
                            <UserRound className='size-6' />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuGroup>

                                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                                <DropdownMenuSeparator />
                                {session ? <>
                                    <Link href={'/orders'}>
                                        <DropdownMenuItem>Your orders</DropdownMenuItem>
                                    </Link>
                                    <Link href={'/'}>
                                        <DropdownMenuItem variant='destructive' onClick={LogOutUser}>Log Out</DropdownMenuItem>
                                    </Link></> : <>
                                    <Link href={'/login'}>
                                        <DropdownMenuItem>Login</DropdownMenuItem>
                                    </Link>
                                    <Link href={'/register'}>
                                        <DropdownMenuItem>Register</DropdownMenuItem>
                                    </Link>
                                </>}


                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href={"/cart"} className='relative'>
                        <ShoppingCart className='size-6' />
                        <Badge variant="outline" className='bg-black text-white absolute bottom-full start-full -translate-x-1/2 translate-y-1/2'>
                            {isLoading ? <Spinner /> : noOfCartItems}
                        </Badge>
                    </Link>
                </div>
            </div>

        </nav>
    )
}
