import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-neutral-dark/40 backdrop-blur-[2px]" />

            <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Loving God by <span className="italic">Serving Others</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        OFHM is a Christian ministry dedicated to providing hope, relief, and spiritual guidance to orphans, widows, and families in need.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        <Link
                            href="/donate"
                            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg"
                        >
                            <Heart className="mr-2 h-5 w-5 fill-current" />
                            Support Our Mission
                        </Link>
                        <Link
                            href="/about"
                            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/20"
                        >
                            Learn More
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
}
