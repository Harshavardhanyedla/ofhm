import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function DonationAppeal() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative overflow-hidden bg-secondary rounded-[3rem] p-8 md:p-16 text-center text-white">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl text-white" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl text-white" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                            Your Support Makes a <span className="italic text-accent">Real Difference</span>
                        </h2>
                        <p className="text-lg text-white/80 font-light leading-relaxed">
                            Every donation, no matter the size, helps us provide food, shelter, and education to those who need it most. Join us in being God&apos;s hands and feet on earth.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                            <Link
                                href="/donate"
                                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-10 py-5 text-lg font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-2xl"
                            >
                                <Heart className="mr-3 h-6 w-6 fill-current" />
                                Donate Now
                            </Link>
                            <p className="text-sm text-white/60">
                                Secure & tax-deductible donations
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
