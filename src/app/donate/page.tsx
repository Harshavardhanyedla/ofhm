"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, DollarSign, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const donationAmounts = [10, 25, 50, 100, 250];
const defaultFunds = [
    { id: "general", name: "General Fund" },
    { id: "orphan-care", name: "Orphan Care" },
    { id: "widow-care", name: "Old Age & Homeless Widows Care" },
    { id: "discipleship-training", name: "Discipleship Training Programs" },
    { id: "tribal-outreach", name: "Outreach to Unreached Tribal Villages" },
    { id: "eye-medical-care", name: "Eye Medical Care" },
    { id: "bible-distribution", name: "Free Bible Distributions" },
    { id: "borewell-projects", name: "Borewell Projects" },
    { id: "church-plantation", name: "Church Plantation" },
    { id: "food-clothes-distribution", name: "Food & Clothes Distribution" },
    { id: "self-sustainable-projects", name: "Self-Sustainable Projects" },
];

/* const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "USD",
    intent: "capture",
    components: "buttons",
    // Force environment to production for live payments
    "environment": "production" as "production",
}; */

export default function DonatePage() {
    const searchParams = useSearchParams();
    const initialFund = searchParams.get("fund") || "general";

    const [amount, setAmount] = useState<number | string>(25);
    const [selectedFund] = useState("general");
    const [step, setStep] = useState(1);
    const [donorInfo, setDonorInfo] = useState({ name: "", email: "" });

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

    const [debugError, setDebugError] = useState<string>("");

    return (
        // <PayPalScriptProvider options={initialOptions}>
        <div className="w-full">
            {/* ... (Existing sections) ... */}


            {/* Header */}
            <section className="bg-muted py-24 pb-12">
                {/* ... same as before ... */}
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

                        <div className="flex justify-center mb-8">
                            <Image
                                src="/branding/ofhm-logo-mark.png"
                                alt="OFHM Trust Logo"
                                width={80}
                                height={80}
                                className="h-20 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
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
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Amount (USD)</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {donationAmounts.map((val) => (
                                                    <button
                                                        key={val}
                                                        onClick={() => handleAmountSelect(val)}
                                                        className={`p-3 rounded-xl transition-all border ${amount === val ? "bg-primary text-white border-primary" : "bg-muted/50 border-transparent text-foreground/60 hover:bg-muted"
                                                            }`}
                                                    >
                                                        ${val}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="relative pt-2">
                                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/30" />
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
                                            <h3 className="text-4xl font-serif text-secondary group">${amount}</h3>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-muted/30 p-6 rounded-xl space-y-4 text-left border border-primary/10">
                                                <h4 className="font-bold uppercase tracking-widest text-primary text-sm flex items-center gap-2">
                                                    Wire Transfer Details
                                                </h4>
                                                <div className="space-y-3 text-sm md:text-base font-medium text-foreground/80">
                                                    <div className="p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                                                        <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-wider block mb-1">Beneficiary Name</span>
                                                        <span className="font-serif text-lg text-secondary">GANDHAM PRIYANKA</span>
                                                    </div>

                                                    <div className="p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                                                        <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-wider block mb-1">Bank</span>
                                                        <span className="font-serif text-lg text-secondary">STATE BANK OF INDIA</span>
                                                        <span className="text-sm text-foreground/60 block mt-1">(ADB BRANCH, PEDDAPURAM)</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div className="p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                                                            <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-wider block mb-1">Account No</span>
                                                            <span className="font-mono text-base">20271023020</span>
                                                        </div>
                                                        <div className="p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                                                            <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-wider block mb-1">Branch Code</span>
                                                            <span className="font-mono text-base">4719</span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div className="p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                                                            <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-wider block mb-1">IFSC Code</span>
                                                            <span className="font-mono text-base">SBIN0004719</span>
                                                        </div>
                                                        <div className="p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                                                            <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-wider block mb-1">MICR Code</span>
                                                            <span className="font-mono text-base">533002103</span>
                                                        </div>
                                                    </div>

                                                    <div className="p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                                                        <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-wider block mb-1">SWIFT Code</span>
                                                        <span className="font-mono text-base">SBININBB308</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStep(2)}
                                            className="w-full text-sm text-foreground/40 hover:text-primary transition-colors py-2"
                                        >
                                            Change Details
                                        </button>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8 py-8"
                                    >
                                        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="h-12 w-12 text-primary" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-serif">Thank You, {donorInfo.name}!</h3>
                                            <p className="text-foreground/60 leading-relaxed">
                                                Your generous contribution has been received. A receipt has been sent to <strong>{donorInfo.email}</strong>.
                                                Together, we are making a difference in the lives of those we serve.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => window.location.href = "/"}
                                            className="w-full py-5 bg-primary text-primary-foreground rounded-full text-lg font-medium shadow-xl shadow-primary/20"
                                        >
                                            Return Home
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
