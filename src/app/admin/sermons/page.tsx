"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";

export default function AdminSermonsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Manage Sermons</h1>
                    <p className="text-foreground/50 text-sm">Upload, edit and organize your ministry messages</p>
                </div>
                <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    <Plus className="h-5 w-5" />
                    Add New Sermon
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
                <div className="p-6 border-b flex items-center gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search sermons by title or speaker..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/30 focus:bg-white border-transparent focus:border-primary transition-all outline-none"
                        />
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/30 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                            <th className="px-8 py-4">Sermon Title</th>
                            <th className="px-8 py-4">Speaker</th>
                            <th className="px-8 py-4">Category</th>
                            <th className="px-8 py-4">Date</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-muted/5 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                                            <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" alt="thumbnail" className="object-cover w-full h-full" />
                                        </div>
                                        <span className="font-bold text-secondary">Walking in Purpose Part {i}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-sm text-foreground/60">Rev. John Doe</td>
                                <td className="px-8 py-5">
                                    <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full">Grace</span>
                                </td>
                                <td className="px-8 py-5 text-sm text-foreground/40">May 12, 2024</td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-muted rounded-lg text-foreground/60 transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-muted rounded-lg text-foreground/40 transition-colors">
                                            <MoreVertical className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
