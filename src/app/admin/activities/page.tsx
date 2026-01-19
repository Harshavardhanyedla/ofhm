"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    ExternalLink,
    Image as ImageIcon,
    Star,
    Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminActivities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingActivity, setEditingActivity] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchActivities = async () => {
        try {
            const res = await fetch("/api/activities");
            const data = await res.json();
            setActivities(data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingActivity._id ? "PUT" : "POST";
        const url = editingActivity._id
            ? `/api/activities/${editingActivity._id}`
            : "/api/activities";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingActivity),
            });
            if (res.ok) {
                setShowModal(false);
                fetchActivities();
            }
        } catch (error) {
            console.error("Error saving activity:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this activity?")) return;
        try {
            const res = await fetch(`/api/activities/${id}`, { method: "DELETE" });
            if (res.ok) fetchActivities();
        } catch (error) {
            console.error("Error deleting activity:", error);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-4xl font-serif font-bold">Activities Management</h1>
                    <p className="text-foreground/50">Manage the humanitarian and spiritual programs of OFHM.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingActivity({
                            title: "",
                            shortDescription: "",
                            fullDescription: "",
                            isFeatured: false,
                            scripture: { text: "", reference: "" },
                            images: []
                        });
                        setShowModal(true);
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="h-5 w-5" /> Add New Activity
                </button>
            </div>

            {loading ? (
                <div className="py-24 text-center text-foreground/30">Loading activities...</div>
            ) : (
                <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/30 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40">
                                <th className="px-8 py-4">Program</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {activities.map((act: any) => (
                                <tr key={act._id} className="group hover:bg-muted/10 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                                                {act.images && act.images[0] ? (
                                                    <img src={act.images[0]} className="w-full h-full object-cover" />
                                                ) : <ImageIcon className="h-5 w-5 text-foreground/20" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-secondary">{act.title}</p>
                                                <p className="text-xs text-foreground/40 truncate max-w-[300px]">{act.shortDescription}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {act.isFeatured && (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">
                                                <Star className="h-3 w-3 fill-primary" /> FEATURED
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <a
                                                href={`/activities/${act.slug}`}
                                                target="_blank"
                                                className="p-2 hover:bg-muted rounded-lg text-foreground/40 hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                            <button
                                                onClick={() => {
                                                    setEditingActivity(act);
                                                    setShowModal(true);
                                                }}
                                                className="p-2 hover:bg-muted rounded-lg text-foreground/40 hover:text-primary transition-colors"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(act._id)}
                                                className="p-2 hover:bg-red-50 rounded-lg text-foreground/40 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl p-8 md:p-12 space-y-10"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-serif font-bold">
                                    {editingActivity._id ? "Edit Activity" : "New Activity"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-foreground/40 hover:text-secondary"
                                >
                                    Cancel
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Title</label>
                                        <input
                                            value={editingActivity.title}
                                            onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                                            className="w-full px-6 py-3 rounded-2xl bg-muted focus:bg-white border border-transparent focus:border-primary focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Short Description</label>
                                        <textarea
                                            value={editingActivity.shortDescription}
                                            onChange={(e) => setEditingActivity({ ...editingActivity, shortDescription: e.target.value })}
                                            className="w-full px-6 py-3 rounded-2xl bg-muted focus:bg-white border border-transparent focus:border-primary focus:outline-none transition-all h-24"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Full Description</label>
                                        <textarea
                                            value={editingActivity.fullDescription}
                                            onChange={(e) => setEditingActivity({ ...editingActivity, fullDescription: e.target.value })}
                                            className="w-full px-6 py-3 rounded-2xl bg-muted focus:bg-white border border-transparent focus:border-primary focus:outline-none transition-all h-48"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Scripture text</label>
                                            <input
                                                value={editingActivity.scripture?.text || ""}
                                                onChange={(e) => setEditingActivity({ ...editingActivity, scripture: { ...editingActivity.scripture, text: e.target.value } })}
                                                className="w-full px-6 py-3 rounded-2xl bg-muted focus:bg-white border border-transparent focus:border-primary focus:outline-none transition-all text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Reference</label>
                                            <input
                                                value={editingActivity.scripture?.reference || ""}
                                                onChange={(e) => setEditingActivity({ ...editingActivity, scripture: { ...editingActivity.scripture, reference: e.target.value } })}
                                                className="w-full px-6 py-3 rounded-2xl bg-muted focus:bg-white border border-transparent focus:border-primary focus:outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Impact Summary</label>
                                        <input
                                            value={editingActivity.impactSummary}
                                            onChange={(e) => setEditingActivity({ ...editingActivity, impactSummary: e.target.value })}
                                            className="w-full px-6 py-3 rounded-2xl bg-muted focus:bg-white border border-transparent focus:border-primary focus:outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Urgent Needs</label>
                                        <input
                                            value={editingActivity.currentNeeds}
                                            onChange={(e) => setEditingActivity({ ...editingActivity, currentNeeds: e.target.value })}
                                            className="w-full px-6 py-3 rounded-2xl bg-muted focus:bg-white border border-transparent focus:border-primary focus:outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 py-4">
                                        <button
                                            type="button"
                                            onClick={() => setEditingActivity({ ...editingActivity, isFeatured: !editingActivity.isFeatured })}
                                            className={`w-12 h-6 rounded-full transition-all relative ${editingActivity.isFeatured ? "bg-primary" : "bg-muted"}`}
                                        >
                                            <div className={`absolute top-1 bottom-1 w-4 rounded-full bg-white transition-all ${editingActivity.isFeatured ? "left-7" : "left-1"}`} />
                                        </button>
                                        <span className="text-sm font-bold text-foreground/60 uppercase tracking-widest">Featured on Homepage</span>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-primary text-white rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                    >
                                        <Check className="h-6 w-6" /> Save Activity
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
