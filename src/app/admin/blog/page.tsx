"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default function AdminBlogPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold">Manage Blog</h1>
                    <p className="text-foreground/50 text-sm">Write, edit and publish news and spiritual insights</p>
                </div>
                <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    <Plus className="h-5 w-5" />
                    Create New Post
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/30 focus:bg-white border-transparent focus:border-primary transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="divide-y">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-8 hover:bg-muted/5 transition-colors group flex items-center gap-8">
                            <div className="w-40 h-24 rounded-2xl bg-muted overflow-hidden flex-shrink-0 border">
                                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" alt="post" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex-grow space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Community</span>
                                    <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">May 15, 2024</span>
                                </div>
                                <h3 className="text-xl font-bold font-serif text-secondary group-hover:text-primary transition-colors">10 Ways to Serve Your Community This Season</h3>
                                <p className="text-sm text-foreground/40 line-clamp-1 italic font-light">&quot;Discover simple yet impactful ways to be a blessing to those around you through acts...&quot;</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-red-100 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
