"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    
    useEffect(() => {
        console.log(path)
    }, [path]) // Also updated dependency array

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
            
            <ul className='hidden md:flex gap-6'>
                {/* Wrap in Link */}
                <Link href="/dashboard">
                    <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
                        ${path == '/dashboard' && 'text-blue-700 font-bold'}`}>
                        Dashboard
                    </li>
                </Link>

                <Link href="/dashboard/questions">
                    <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
                        ${path == '/dashboard/questions' && 'text-blue-700 font-bold'}`}>
                        Questions
                    </li>
                </Link>

                <Link href="/dashboard/how">
                    <li className={`hover:text-blue-700 hover:font-bold transition-all cursor-pointer 
                        ${path == '/dashboard/how' && 'text-blue-700 font-bold'}`}>
                        How it Works?
                    </li>
                </Link>
            </ul>

            <UserButton />
        </div>
    )
}

export default Header
