"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Mic2,
    HeartHandshake,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Target
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const sidebarItems = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Activities", href: "/admin/activities", icon: Target },
    { name: "Sermons", href: "/admin/sermons", icon: Mic2 },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Ministries", href: "/admin/ministries", icon: HeartHandshake },
    { name: "Donations", href: "/admin/donations", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-white border-r min-h-screen p-8 flex flex-col gap-12 sticky top-0 h-screen">
            <div className="flex items-center gap-3">
                <Image
                    src="/branding/ofhm-logo-mark.png"
                    alt="OFHM Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                />
                <div>
                    <h2 className="font-serif font-bold text-lg leading-tight">OFHM Admin</h2>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Dashboard v1.0</p>
                </div>
            </div>

            <nav className="flex-grow space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "text-foreground/60 hover:bg-muted"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-foreground/30 group-hover:text-primary transition-colors"}`} />
                                <span className="font-medium">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight className="h-4 w-4" />}
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-medium"
            >
                <LogOut className="h-5 w-5" />
                Sign Out
            </button>
        </aside>
    );
}
