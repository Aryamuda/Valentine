import { useEffect, useRef, useState } from "react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 14 + Math.random() * 20,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    alt: Math.random() > 0.5,
    opacity: 0.15 + Math.random() * 0.3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-primary"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `${h.alt ? "float-heart-alt" : "float-heart"} ${h.duration}s ease-in-out ${h.delay}s infinite`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const el = ref.current;
    if (el) {
      el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
};

const HeroSection = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div
        className={`transition-all duration-[1.5s] ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-script text-2xl md:text-3xl text-primary mb-4">Happy Valentine's Day</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
          To My <span className="text-primary italic">Love</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          Every moment with you is a gift I'll cherish forever
        </p>
        <div className="mt-10 animate-bounce">
          <span className="text-primary text-2xl">↓</span>
        </div>
      </div>
    </section>
  );
};

const LoveLetterSection = () => (
  <section className="relative py-20 md:py-32 px-6 flex justify-center">
    <div className="reveal max-w-2xl w-full">
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary text-3xl">♥</div>
        <p className="font-script text-xl md:text-2xl text-primary mb-6">My Dearest,</p>
        <div className="font-body text-foreground/90 space-y-4 leading-relaxed text-base md:text-lg">
          <p>
            From the moment you walked into my life, everything changed.
            You brought colors to my world that I never knew existed,
            and a warmth that fills every corner of my heart.
          </p>
          <p>
            Every day with you is an adventure, every laugh we share is a treasure,
            and every quiet moment together reminds me how lucky I am
            to have found my person in you.
          </p>
          <p>
            Thank you for being my best friend, my partner, my everything.
            I love you more than words could ever express — but I'll never
            stop trying.
          </p>
        </div>
        <p className="font-script text-xl text-primary mt-8 text-right">
          Forever yours ♥
        </p>
      </div>
    </div>
  </section>
);

const photoPlaceholders = [
  { id: 1, label: "Our first date" },
  { id: 2, label: "That perfect sunset" },
  { id: 3, label: "Laughing together" },
  { id: 4, label: "Adventures with you" },
  { id: 5, label: "My favorite smile" },
  { id: 6, label: "Us being us" },
];

const PhotoGallerySection = () => (
  <section className="relative py-20 md:py-32 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="reveal text-center mb-12">
        <p className="font-script text-2xl md:text-3xl text-primary mb-2">Our Moments</p>
        <p className="font-body text-muted-foreground">Every picture tells our story</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {photoPlaceholders.map((photo, i) => (
          <div
            key={photo.id}
            className={`reveal reveal-delay-${(i % 3) + 1} group relative aspect-square rounded-xl overflow-hidden bg-secondary border border-border cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-4xl mb-3 text-primary/40 group-hover:text-primary/60 transition-colors">📷</span>
              <p className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {photo.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="reveal text-center text-sm text-muted-foreground mt-8 font-body italic">
        Upload your photos in chat to fill this gallery ♥
      </p>
    </div>
  </section>
);

const FooterSection = () => (
  <section className="relative py-20 md:py-32 px-6 text-center">
    <div className="reveal max-w-lg mx-auto">
      <p className="font-script text-3xl md:text-4xl text-primary mb-6">
        You are my today and all of my tomorrows
      </p>
      <div className="flex justify-center gap-2 text-primary text-2xl mb-8">
        <span>♥</span>
        <span className="animate-pulse">♥</span>
        <span>♥</span>
      </div>
      <p className="font-body text-sm text-muted-foreground">
        Made with ❤️ just for you
      </p>
    </div>
  </section>
);

const Index = () => {
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef} className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts />
      <HeroSection />
      <LoveLetterSection />
      <PhotoGallerySection />
      <FooterSection />
    </div>
  );
};

export default Index;
