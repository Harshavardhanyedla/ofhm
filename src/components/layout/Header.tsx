'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Activities', href: '/activities' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-background/90 backdrop-blur-md border-b py-3 shadow-md'
                    : 'bg-background/60 backdrop-blur-sm py-5'
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <Image
                            src="/branding/ofhm-logo-full.png"
                            alt="Our Father's Home Ministries"
                            width={180}
                            height={48}
                            className="h-10 md:h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'text-sm font-medium transition-colors',
                                    pathname === item.href
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-foreground/70 hover:text-primary'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/donate"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <Heart className="mr-2 h-4 w-4" />
                            Donate
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 transition-colors text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </nav>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b animate-in fade-in slide-in-from-top-4">
                    <div className="flex flex-col p-6 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'text-lg font-medium',
                                    pathname === item.href ? 'text-primary' : 'text-foreground/70'
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/donate"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-lg font-medium text-primary-foreground"
                            onClick={() => setIsOpen(false)}
                        >
                            <Heart className="mr-2 h-5 w-5" />
                            Donate Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
