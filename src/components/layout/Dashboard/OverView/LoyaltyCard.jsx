import { FaStar } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function LoyaltySection() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-xl bg-accent/5 border border-accent/20 p-8 text-center flex flex-col items-center justify-center gap-4 group hover:bg-accent/10 transition-colors">
                <div className="size-16 rounded-full bg-white flex items-center justify-center text-accent text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    <FaStar />
                </div>

                <div>
                    <h3 className="text-lg font-accent font-bold text-primary">
                        Loyalty Points
                    </h3>
                    <p className="text-4xl font-bold text-accent font-default my-1">1,250</p>
                    <p className="text-sm text-text/60 font-default">Equivalent to $12.50 off</p>
                </div>

                <Button variant="link" size="sm" className="font-bold underline decoration-accent/30 hover:decoration-accent">
                    View Rewards History
                </Button>
            </div>

            {/* Promotions Banner (Integrated into same section for balance) */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-xl bg-primary text-white p-8 group">
                <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent z-10"></div>

                <div className="relative z-20 max-w-md h-full flex flex-col justify-center">
                    <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">Member Exclusive</span>
                    <h2 className="text-2xl md:text-3xl font-accent font-bold mb-3 text-white leading-tight">
                        Try our new Botanical Night Serum
                    </h2>
                    <p className="text-white/80 text-sm font-default mb-6 leading-relaxed">
                        Early access for loyal members to our latest organic formulation designed for deep restoration.
                    </p>
                    <Button variant="accent" size="sm" className="w-fit">
                        Explore Shop
                    </Button>
                </div>

                <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden hidden md:block">
                    <Image
                        src="https://plus.unsplash.com/premium_photo-1678122394593-9c8651030e46?q=80&w=2070&auto=format&fit=crop"
                        alt="Promo"
                        width={800}
                        height={800}
                        unoptimized={true}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </div>
            </div>
        </section>
    );
}