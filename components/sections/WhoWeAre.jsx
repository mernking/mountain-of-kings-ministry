import Image from "next/image";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Minister Image */}
        <div className="relative group">
          {/* Decorative Gold Frame Background */}
          <div className="absolute -inset-4 border border-accent/20 rounded-sm translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
          
          <div className="relative aspect-square overflow-hidden rounded-sm bg-neutral-900 border border-text/10">
            <Image
              src="/images/minister.jpeg" // Replace with actual path in public/images/
              alt="Minister In-Charge"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Soft Gold Overlay on bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
          </div>
          
          {/* Caption Overlay */}
          <div className="absolute bottom-6 left-6">
            <p className="text-accent font-display text-xl tracking-tighter">Minister In-Charge</p>
            <div className="h-0.5 w-12 bg-accent mt-1" />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-accent text-sm font-bold uppercase tracking-[0.3em]">
            Our Identity
          </h2>
          
          <h3 className="text-4xl md:text-5xl font-display text-text leading-tight">
            Raising Quality Believers <br /> for the Kingdom & Marketplace
          </h3>
          
          <div className="space-y-4 text-text/70 font-sans leading-relaxed text-lg">
            <p>
              Mountain of Kings Ministries is dedicated to teaching and raising quality 
              believers of Christ. Our mission spans both the marketplace and the church, 
              bridging the gap between spiritual depth and worldly excellence.
            </p>
            <p>
              We believe in bringing divine innovation to the world from the body of Christ, 
              enriching lives with a love that surpasses all knowledge and understanding. 
              Our goal is to see every believer walk in the fullness of God.
            </p>
          </div>

          <div className="pt-6">
            <Link 
              href="/about" 
              className="inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-accent text-accent hover:bg-accent hover:text-background transition-all duration-300 group"
            >
              <span className="uppercase tracking-widest font-bold text-sm">Discover Our Vision</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-2 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}