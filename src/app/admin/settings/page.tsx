"use client";

import { useState } from "react";
import { Save, Plus, Trash2, Mail, Phone } from "lucide-react";

export default function SettingsPage() {
    const [statements, setStatements] = useState([
        "There is no other way except God.",
        "We love God.",
        "We believe in God."
    ]);

    const addStatement = () => setStatements([...statements, ""]);
    const removeStatement = (idx: number) => setStatements(statements.filter((_, i) => i !== idx));
    const updateStatement = (idx: number, val: string) => {
        const next = [...statements];
        next[idx] = val;
        setStatements(next);
    };

    return (
        <div className="space-y-12 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-4xl font-serif font-bold">Global Settings</h1>
                <p className="text-foreground/50">Manage the core heritage text and contact information across the platform.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Hero Statements */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-border/50 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold font-serif">Homepage Hero Statements</h3>
                        <button
                            onClick={addStatement}
                            className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {statements.map((s, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                                <span className="text-xs font-bold text-foreground/20 w-4">{idx + 1}</span>
                                <input
                                    value={s}
                                    onChange={(e) => updateStatement(idx, e.target.value)}
                                    className="flex-1 px-6 py-3 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <button
                                    onClick={() => removeStatement(idx)}
                                    className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-border/50 shadow-sm space-y-8">
                    <h3 className="text-xl font-bold font-serif">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                                <input className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl text-sm font-medium" defaultValue="contact@ofhm.org" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                                <input className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl text-sm font-medium" defaultValue="+919949430413" />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Address Details</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input className="px-4 py-3 bg-muted rounded-xl text-sm" placeholder="Line 1" defaultValue="Dr. Gandham Buli Veerraju" />
                                <input className="px-4 py-3 bg-muted rounded-xl text-sm" placeholder="Line 2" defaultValue="K-Nayakampalli (PO), Via Peddapuram" />
                                <input className="px-4 py-3 bg-muted rounded-xl text-sm" placeholder="City" defaultValue="Kakinada District" />
                                <input className="px-4 py-3 bg-muted rounded-xl text-sm" placeholder="Pin" defaultValue="533437" />
                                <input className="px-4 py-3 bg-muted rounded-xl text-sm" placeholder="State" defaultValue="Andhra Pradesh" />
                                <input className="px-4 py-3 bg-muted rounded-xl text-sm" placeholder="Country" defaultValue="India" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Heritage Summary */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-border/50 shadow-sm space-y-4">
                    <h3 className="text-xl font-bold font-serif">Ministry Heritage Summary (Footer)</h3>
                    <textarea
                        className="w-full h-32 px-6 py-4 bg-muted rounded-[2rem] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20"
                        defaultValue="OUR FATHER'S HOME MINISTRIES, was established in July 2010. The visionary behind this initiative was Dr. Gandham Buli Veerraju..."
                    />
                </div>

                <div className="flex justify-end">
                    <button className="px-10 py-4 bg-primary text-white rounded-full font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                        <Save className="h-5 w-5" />
                        Save All Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
