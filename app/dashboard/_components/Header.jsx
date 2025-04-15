"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();

    useEffect(() => {
        if (path) {
            console.log(path);
        }
    }, [path]);

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image
                src='/Logo.png'
                width={30}
                height={30}
                alt='logo'
                priority // <-- ensures it's rendered immediately on both server & client
                style={{ color: 'transparent' }} // optional styling to match server/client render
            />

            <ul className='hidden md:flex gap-6'>
                

                <Link href="/dashboard/resources">
                    <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
                        ${path === '/dashboard/resources' ? 'text-blue-700 font-bold' : ''}`}>
                        Resources
                    </li>
                </Link>

                <Link href="/dashboard">
                    <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
                        ${path === '/dashboard' ? 'text-blue-700 font-bold' : ''}`}>
                        Dashboard
                    </li>
                </Link>

                <Link href="/dashboard/tips">
                    <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
                        ${path === '/dashboard/tips' ? 'text-blue-700 font-bold' : ''}`}>
                        Tips & Tricks
                    </li>
                </Link>
            </ul>

            <UserButton />
        </div>
    )
}

export default Header
