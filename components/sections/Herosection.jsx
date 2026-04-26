import Image from "next/image";

export default function HeroSection() {
  const scrollingPhrase =
    "TEACHING AND RAISING QUALITY BELIEVERS • BRINGING INNOVATION TO THE WORLD • ENRICHING LIVES WITH THE LOVE OF GOD • ";

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Image: B&W Crusade Ground */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Crusade Grounds"
          fill
          className="object-cover grayscale brightness-25 contrast-125 opacity-40"
          priority
        />
        {/* Radial gradient to make the center text pop */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--background)_0%,transparent_100%] opacity-30" />{" "}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-accent text-sm md:text-lg tracking-[0.3em] uppercase mb-4 font-sans font-medium">
          Mountain of
        </h2>
        <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] leading-none text-text drop-shadow-[0_0_35px_rgba(255,215,0,0.3)]">
          Kings
        </h1>
        <p className="mt-6 text-text/70 italic font-serif text-lg md:text-xl">
          Psalm 21
        </p>
      </div>

      {/* Bottom Scrolling Text */}
      <div className="absolute bottom-0 w-full py-6 border-t border-text/10 bg-background/80 backdrop-blur-sm overflow-hidden">
        <div className="animate-infinite-scroll whitespace-nowrap">
          <span className="text-text/40 text-sm font-sans tracking-widest uppercase py-2">
            {scrollingPhrase.repeat(4)}
          </span>
        </div>
      </div>
    </section>
  );
}
