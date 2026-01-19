"use client";

import {
    Users,
    Heart,
    TrendingUp,
    ArrowUpRight,
    Calendar,
    DollarSign
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
    { label: "Total Donations", value: "₹24,50,000", change: "+12.5%", icon: DollarSign, color: "bg-green-500" },
    { label: "Active Orphans", value: "254", change: "+4", icon: Heart, color: "bg-red-500" },
    { label: "Monthly Growth", value: "18%", change: "+2.1%", icon: TrendingUp, color: "bg-blue-500" },
    { label: "Community Members", value: "1,205", change: "+48", icon: Users, color: "bg-purple-500" },
];

const recentDonations = [
    { id: 1, donor: "Alice Johnson", amount: "₹5,000", fund: "Orphan Care", date: "2 mins ago", status: "completed" },
    { id: 2, donor: "Bob Smith", amount: "₹2,500", fund: "General Fund", date: "15 mins ago", status: "completed" },
    { id: 3, donor: "Charlie Brown", amount: "₹10,000", fund: "Education", date: "1 hour ago", status: "pending" },
    { id: 4, donor: "David Wilson", amount: "₹1,000", fund: "Widow Support", date: "3 hours ago", status: "completed" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-4xl font-serif font-bold">Dashboard Overview</h1>
                    <p className="text-foreground/50">Welcome back, Admin. Here&apos;s what&apos;s happening with OFHM today.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white px-4 py-2 rounded-xl border flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4 text-primary" />
                        May 19, 2024
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-border/50 shadow-sm space-y-4 hover:shadow-md transition-shadow cursor-default group"
                    >
                        <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center text-white`}>
                                <stat.icon className={`h-6 w-6 stroke-[2.5px]`} style={{ color: stat.color.replace('bg-', '') }} />
                            </div>
                            <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 rounded-full px-2 py-1">
                                {stat.change}
                                <ArrowUpRight className="h-3 w-3" />
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-serif font-bold text-secondary group-hover:text-primary transition-colors">{stat.value}</p>
                            <p className="text-sm font-medium text-foreground/40 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Donations Table */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
                    <div className="p-8 border-b flex justify-between items-center">
                        <h3 className="text-xl font-bold font-serif">Recent Donations</h3>
                        <button className="text-sm font-bold text-primary hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40">
                                    <th className="px-8 py-4">Donor</th>
                                    <th className="px-8 py-4">Amount</th>
                                    <th className="px-8 py-4">Fund</th>
                                    <th className="px-8 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {recentDonations.map((donation) => (
                                    <tr key={donation.id} className="group hover:bg-muted/10 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                                                    {donation.donor.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{donation.donor}</p>
                                                    <p className="text-xs text-foreground/40">{donation.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-sm text-secondary">{donation.amount}</td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs bg-muted px-3 py-1 rounded-full font-medium">{donation.fund}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-lg ${donation.status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                                }`}>
                                                {donation.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Impact Counters Management */}
                <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm p-8 space-y-8">
                    <h3 className="text-xl font-bold font-serif">Impact Metrics</h3>
                    <div className="space-y-6">
                        {[
                            { label: "ORPHAN CHILDREN", value: 1500, key: 'orphans' },
                            { label: "CHURCH PLANTING", value: 150, key: 'churches' },
                            { label: "MEDICAL CAMPS", value: 750, key: 'medicalCamps' },
                            { label: "BIBLE TO A NEW SOULS", value: 9700, key: 'bibles' },
                        ].map((metric) => (
                            <div key={metric.label} className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-foreground/40 px-1">
                                    <span>{metric.label}</span>
                                    <span className="text-primary">{metric.value}</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 bg-muted rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        defaultValue={metric.value}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-4 bg-secondary text-white rounded-2xl font-bold hover:bg-primary transition-colors shadow-lg">
                        Update metrics
                    </button>
                </div>
            </div>
        </div>
    );
}
