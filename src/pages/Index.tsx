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
        className={`transition-all duration-[1.5s] ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <p className="font-script text-2xl md:text-3xl text-primary mb-4">Happy Valentine's Day</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
          My Dearest <span className="text-primary italic">Keysya</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          It feels like it has been forever, through thick and thin, cries and tears.
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
        <p className="font-script text-xl md:text-2xl text-primary mb-6">Hi, I made this just for you.</p>
        <div className="font-body text-foreground/90 space-y-4 leading-relaxed text-base md:text-lg">
          <p>
            It feels like forever since we first met. I still remember the first time
            I saw you on an Instagram post, so stunning, as always until now, that you
            immediately caught my attention. Ever since then, you've stayed in my mind.
          </p>
          <p>
            Thank you for existing, for staying, and for being around me.
            You genuinely make me feel calm and at ease.
          </p>
          <p>
            I truly love you. I really do. But there were times when I hurt you
            and made you suffer, and I regret that deeply. It was never my intention.
            I hope we can grow, heal together.
          </p>
          <p>
            Happy Valentine, Keysya ❤️
          </p>
        </div>
        <p className="font-script text-xl text-primary mt-8 text-right">
          Yours, sincerely. ♥
        </p>
      </div>
    </div>
  </section>
);

const photos = [
  { id: 1, src: "/1.jpg", label: "The moment you were become my girl" },
  { id: 2, src: "/2.jpg", label: "Very first time when i met you at your place" },
  { id: 3, src: "/3.jpg", label: "The moment we had a kiss on a photobooth (it cannot be displayed)" },
  { id: 4, src: "/4.jpg", label: "Last picture we took" },
  { id: 5, src: "/5.jpg", label: "We are having working hour at that time" },
  { id: 6, src: "/6.jpg", label: "MALIKAA" },
];

const PhotoGallerySection = () => (
  <section className="relative py-20 md:py-32 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="reveal text-center mb-12">
        <p className="font-script text-2xl md:text-3xl text-primary mb-2">Our Moments</p>
        <p className="font-body text-muted-foreground">Every picture tells our story</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className={`reveal reveal-delay-${(i % 3) + 1} group relative aspect-square rounded-xl overflow-hidden bg-secondary border border-border cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl`}
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="absolute bottom-0 left-0 right-0 p-3 font-body text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
              {photo.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FooterSection = () => (
  <section className="relative py-20 md:py-32 px-6 text-center">
    <div className="reveal max-w-lg mx-auto">
      <p className="font-body text-muted-foreground">
        Thank you for seeing it up till this bottom, this one is really made with love
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
