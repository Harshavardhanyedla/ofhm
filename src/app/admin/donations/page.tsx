"use client";

import { CheckCircle2 } from "lucide-react";

export default function AdminDonationsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Donations History</h1>
                    <p className="text-foreground/50 text-sm">Track contributions and export reports for ministry bookkeeping</p>
                </div>
                <button className="bg-secondary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-primary transition-colors">
                    Export to CSV
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/30 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                            <th className="px-8 py-4">Donor Details</th>
                            <th className="px-8 py-4">Transaction ID</th>
                            <th className="px-8 py-4">Amount</th>
                            <th className="px-8 py-4">Fund</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4">Provider</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-muted/5 transition-colors">
                                <td className="px-8 py-6">
                                    <div>
                                        <p className="font-bold text-sm">Donor Name {i}</p>
                                        <p className="text-xs text-foreground/40">donor{i}@example.com</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6 font-mono text-xs text-foreground/50">pay_NXjk2{i}983zP</td>
                                <td className="px-8 py-6 font-bold text-secondary text-sm">${i}00.00</td>
                                <td className="px-8 py-6">
                                    <span className="text-xs font-medium text-foreground/60 bg-muted px-2 py-1 rounded-lg">Orphan Care</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#003087]">PayPal</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
