"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, IndianRupee, Globe, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const donationAmounts = [500, 1000, 2500, 5000, 10000];
const funds = [
    { id: "general", name: "General Fund" },
    { id: "orphan-care", name: "Orphan Care" },
    { id: "widow-support", name: "Widow Support" },
    { id: "education", name: "Education Mission" },
];

import { Suspense } from "react";

function DonateContent() {
    const searchParams = useSearchParams();
    const initialFund = searchParams.get("fund") || "general";

    const [amount, setAmount] = useState<number | string>(1000);
    const [selectedFund, setSelectedFund] = useState(initialFund);
    const [step, setStep] = useState(1);
    const [donorInfo, setDonorInfo] = useState({ name: "", email: "" });
    const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "paypal">("razorpay");

    const handleAmountSelect = (val: number) => {
        setAmount(val);
    };

    const handleNext = () => {
        if (step === 1) {
            if (!amount || Number(amount) <= 0) {
                alert("Please enter a valid amount");
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!donorInfo.name || !donorInfo.email) {
                alert("Please fill in your details");
                return;
            }
            setStep(3);
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <section className="bg-muted py-24 pb-12">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Make a Gift</h2>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground">Support Our Ministry</h1>
                    <p className="text-lg text-foreground/70 font-light leading-relaxed">
                        Your generosity enables us to continue our mission of serving the vulnerable. Choose a fund and amount to contribute to.
                    </p>
                </div>
            </section>

            {/* Donation Form Container */}
            <section className="py-24 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-xl mx-auto">
                        {/* Progress Stepper */}
                        <div className="flex justify-between mb-12 relative">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= s ? "bg-primary text-white scale-110" : "bg-white border text-foreground/30"
                                        }`}
                                >
                                    {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-primary/10 border border-border/50">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Select Fund</label>
                                            <div className="grid grid-cols-1 gap-3">
                                                {funds.map((f) => (
                                                    <button
                                                        key={f.id}
                                                        onClick={() => setSelectedFund(f.id)}
                                                        className={`p-4 rounded-2xl text-left transition-all border ${selectedFund === f.id ? "bg-primary/5 border-primary text-primary" : "bg-muted/30 border-transparent text-foreground/60"
                                                            }`}
                                                    >
                                                        <span className="font-medium">{f.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Amount (INR)</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {donationAmounts.map((val) => (
                                                    <button
                                                        key={val}
                                                        onClick={() => handleAmountSelect(val)}
                                                        className={`p-3 rounded-xl transition-all border ${amount === val ? "bg-primary text-white border-primary" : "bg-muted/50 border-transparent text-foreground/60 hover:bg-muted"
                                                            }`}
                                                    >
                                                        ₹{val}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="relative pt-2">
                                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/30" />
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    placeholder="Custom Amount"
                                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-xl font-serif text-secondary"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleNext}
                                            className="w-full py-5 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                                        >
                                            Continue
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-serif">Your Information</h3>
                                            <p className="text-foreground/50 text-sm">We&apos;ll use this to send your receipt and impact updates.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={donorInfo.name}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={donorInfo.email}
                                                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="flex-1 py-5 bg-muted text-foreground/60 rounded-full font-medium"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="flex-[2] py-5 bg-primary text-primary-foreground rounded-full text-lg font-medium shadow-xl shadow-primary/20"
                                            >
                                                Proceed to Payment
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center space-y-2">
                                            <p className="text-sm font-bold uppercase tracking-widest text-primary">Summary</p>
                                            <h3 className="text-4xl font-serif text-secondary group">₹{amount}</h3>
                                            <p className="text-foreground/60">Supporting <span className="text-foreground font-medium">{funds.find(f => f.id === selectedFund)?.name}</span></p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex bg-muted p-1 rounded-2xl">
                                                <button
                                                    onClick={() => setPaymentMethod("razorpay")}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${paymentMethod === "razorpay" ? "bg-white shadow-sm text-primary" : "text-foreground/40"
                                                        }`}
                                                >
                                                    <IndianRupee className="h-4 w-4" />
                                                    Razorpay (India)
                                                </button>
                                                <button
                                                    onClick={() => setPaymentMethod("paypal")}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${paymentMethod === "paypal" ? "bg-white shadow-sm text-[#003087]" : "text-foreground/40"
                                                        }`}
                                                >
                                                    <Globe className="h-4 w-4" />
                                                    PayPal (Global)
                                                </button>
                                            </div>

                                            {paymentMethod === "razorpay" ? (
                                                <button className="w-full py-5 bg-black text-white rounded-full text-lg font-bold flex items-center justify-center gap-2">
                                                    Pay Securely with Razorpay
                                                </button>
                                            ) : (
                                                <PayPalScriptProvider options={{ clientId: "test" }}>
                                                    <PayPalButtons style={{ layout: "vertical", shape: "pill" }} />
                                                </PayPalScriptProvider>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-center gap-2 text-xs text-foreground/40 pt-4">
                                            <ShieldCheck className="h-4 w-4" />
                                            Secure 256-bit SSL encrypted payment
                                        </div>

                                        <button
                                            onClick={() => setStep(2)}
                                            className="w-full text-sm text-foreground/40 hover:text-primary transition-colors py-2"
                                        >
                                            Change Details
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function DonatePage() {
    return (
        <Suspense fallback={
            <div className="w-full py-24 text-center">
                <p className="text-foreground/50">Loading donation form...</p>
            </div>
        }>
            <DonateContent />
        </Suspense>
    );
}
