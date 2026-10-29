import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Globe2,
  Headphones,
  IndianRupee,
  Landmark,
  MapPin,
  MessageCircle,
  PenTool,
  ShieldCheck,
  Smartphone,
  Star,
  Store,
  Upload,
  Users,
  Sparkles,
  Instagram,
} from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink } from "../lib/site";
import { useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { CertBadges } from "../components/cert-badges";

function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 3000);
    return () => clearTimeout(t);
  }, [i, paused, n]);

  return (
    <section
      className="relative isolate overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative h-[600px] sm:h-[560px] lg:h-[540px]">
        {SLIDES.map((s, idx) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-500 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={idx !== i}
          >
            <img
              src={s.image}
              alt=""
              className={`absolute inset-y-0 right-0 h-full w-full object-cover object-[65%_center] lg:w-[64%] lg:object-center ${idx === i ? "kenburns" : ""}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0d0d0d_0%,#0d0d0d_34%,rgba(13,13,13,0.75)_50%,rgba(13,13,13,0.05)_75%)] max-lg:bg-[linear-gradient(90deg,#0d0d0d_10%,rgba(13,13,13,0.6)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:hidden" />
            {idx === i && "badges" in s && s.badges && <CertBadges />}
            {idx === i && (
              <div className="container-x relative flex h-full flex-col justify-center pb-28 max-lg:items-center max-lg:text-center sm:pb-24">
                <span className="rise inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white ring-1 ring-white/20">
                  <span className="h-2 w-2 rounded-full bg-brand" /> {s.tag}
                </span>
                <h1
                  className="rise mt-5 max-w-xl text-[38px] max-lg:mx-auto font-extrabold leading-[1.1] !text-white sm:text-5xl lg:text-[56px]"
                  style={{ animationDelay: "80ms" }}
                >
                  {s.title}
                </h1>
                <p className="rise mt-5 max-w-lg text-[17px] max-lg:mx-auto leading-relaxed text-white/85" style={{ animationDelay: "160ms" }}>
                  {s.text}
                </p>
                <div className="rise mt-8 flex flex-wrap gap-3 max-lg:justify-center" style={{ animationDelay: "240ms" }}>
                  {s.cta ? (
                    <>
                      <a href="#enquiry" className="btn-brand">
                        {s.cta} <ArrowRight className="h-4 w-4" />
                      </a>
                      <Link to={s.link} className="btn-ghost">
                        {s.linkText}
                      </Link>
                    </>
                  ) : (
                    <Link to={s.link} className="btn-brand">
                      {s.linkText} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => setI((i - 1 + n) % n)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20 md:grid"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setI((i + 1) % n)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20 md:grid"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-20">
          {SLIDES.map((s, idx) => (
            <button
              key={s.title}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-brand" : "w-2.5 bg-white/50 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: Star, big: "4.8", small: "Google Rating" },
  { icon: Users, big: "1,000+", small: "Happy Clients" },
  { icon: MapPin, big: "Pan-India", small: "Service" },
  { icon: ShieldCheck, big: "100%", small: "Online Process" },
];

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function EnquiryBar() {
  return (
    <section id="enquiry" className="relative z-10 flow-root scroll-mt-28 bg-surface">
      <div className="container-x relative z-10 -mt-16">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_30px_60px_-30px_rgba(11,31,75,0.45)] sm:p-6">
          <p className="mb-4 text-center text-[15px] font-semibold text-navy sm:text-left">
            Get a free call from our expert <span className="font-normal text-body">— tell us what you need</span>
          </p>
          <LeadForm />
        </div>
      </div>
      <div className="pb-10 pt-8">
      <div className="container-x grid grid-cols-2 gap-y-6 md:grid-cols-4">
        {TRUST.map((t, idx) => (
          <div key={t.small} className={`flex items-center justify-center gap-3 ${idx > 0 ? "md:border-l md:border-line" : ""}`}>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-royal shadow-sm">
              {idx === 0 ? <GoogleG /> : <t.icon className="h-5 w-5" />}
            </span>
            <div>
              <p className="text-lg font-bold leading-tight text-navy">{t.big}</p>
              <p className="text-[13px]">{t.small}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>}
      <h2 className="text-3xl font-bold sm:text-[38px] sm:leading-tight">{title}</h2>
      {text && <p className="mt-3 text-[16px]">{text}</p>}
    </div>
  );
}

function CategoryBanners() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <SectionHead eyebrow="Our Services" title="What Do You Need Help With?" text="Pick a category. Each one has a clear list of services." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              to={`/services/${c.slug}`}
              className={`${i === 6 ? "sm:col-span-2 lg:col-span-3 lg:min-h-[300px]" : ""} group relative isolate flex min-h-[250px] flex-col justify-end overflow-hidden rounded-2xl p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl`}
            >
              <img src={c.image} alt="" loading="lazy" className={`absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${i === 6 ? "object-[50%_22%]" : ""}`} />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/10" />
              <span className="mb-auto w-fit rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white ring-1 ring-white/25 backdrop-blur">
                {c.services.length} {c.slug === "microsoft-certifications" ? "exams" : "services"}
              </span>
              <h3 className="mt-6 max-w-[60%] text-[24px] font-bold leading-tight !text-white">{c.title}</h3>
              <p className="mt-2 max-w-[62%] text-[14px] leading-snug text-white/85">{c.short}</p>
              <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white transition group-hover:gap-2.5">
                View Services <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const POP_ICONS = [FileText, Landmark, BadgeCheck, Store, PenTool, Globe2, Instagram, MessageCircle];

function Popular() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <SectionHead eyebrow="Most Asked" title="Most Popular Services" text="These are what most of our customers start with." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p, idx) => {
            const Icon = POP_ICONS[idx];
            return (
              <Link
                key={p.name}
                to={serviceUrl(p.cat, p.name)}
                className="group flex flex-col rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-royal/30 hover:shadow-[0_20px_40px_-24px_rgba(30,79,216,0.45)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal/10 text-royal transition group-hover:bg-royal group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold leading-snug">{p.name}</h3>
                <p className="mt-1 text-[14px] text-slate-500">{p.days}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-brand group-hover:gap-2">
                  Know More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: ClipboardList, title: "Tell Us What You Need", text: "Fill the form or call us. It takes 1 minute." },
  { icon: Upload, title: "Share Your Documents", text: "Send them on WhatsApp or email. No office visit." },
  { icon: BadgeCheck, title: "We Get It Done", text: "You get updates at every step until it's complete." },
];

function Process() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="container-x">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">How It Works</p>
          <h2 className="text-3xl font-bold !text-white sm:text-[38px]">Simple 3-Step Process</h2>
        </div>
        <div className="relative grid gap-6 md:grid-cols-3">
          {STEPS.map((s, idx) => (
            <div key={s.title} className="relative rounded-2xl bg-white/[0.06] p-7 text-center ring-1 ring-white/10">
              <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-[0_0_0_8px_rgba(11,31,75,1)]">
                <s.icon className="h-7 w-7" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-white text-[12px] font-bold text-navy">
                  {idx + 1}
                </span>
              </span>
              <h3 className="mt-5 text-xl font-semibold !text-white">{s.title}</h3>
              <p className="mt-2 text-[15px] text-white/75">{s.text}</p>
              {idx < STEPS.length - 1 && (
                <span className="absolute -bottom-[22px] left-1/2 z-10 grid h-10 w-10 -translate-x-1/2 rotate-90 place-items-center rounded-full bg-navy text-brand ring-1 ring-white/15 md:-right-[22px] md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rotate-0">
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { icon: Sparkles, title: "One place for everything", text: "Registration, branding, website and marketing — no running around." },
  { icon: IndianRupee, title: "Clear pricing", text: "You know the full cost before we start. No hidden charges." },
  { icon: Smartphone, title: "Fully online", text: "Do everything from your phone, from anywhere in India." },
  { icon: Headphones, title: "Real experts", text: "CA, CS and design experts guide you at every step." },
];

const REVIEWS = [
  { name: "Ravi K.", city: "Hyderabad", text: "My GST and company registration were done in a week. Very smooth, and they explained everything simply." },
  { name: "Priya S.", city: "Bengaluru", text: "They designed our logo and website together. Looks very professional and customers notice it." },
  { name: "Arjun M.", city: "Pune", text: "Our Instagram enquiries doubled in 2 months. The team posts on time every week." },
];

function WhyAndReviews() {
  const site = useSite();
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start">
        <div>
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">Why {site.siteName}</p>
          <h2 className="text-3xl font-bold sm:text-[38px] sm:leading-tight">Why Businesses Trust Us</h2>
          <div className="mt-8 space-y-5">
            {WHY.map((w) => (
              <div key={w.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <w.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{w.title}</h3>
                  <p className="text-[15px]">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">What Our Clients Say</h3>
            <span className="flex items-center gap-2 text-[14px]">
              <span className="flex text-brand">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-4 w-4 fill-current" />)}</span>
              4.8 on Google
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {REVIEWS.map((r, idx) => (
              <figure key={r.name} className={`rounded-2xl border border-line bg-white p-6 ${idx === 2 ? "sm:col-span-2" : ""}`}>
                <div className="flex text-brand">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-navy">"{r.text}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-royal text-[14px] font-bold text-white">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{r.name}</span>
                    <span className="text-[13px]">{r.city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Do I need to visit your office?", a: "No. Everything is done online. You can share documents on WhatsApp or email." },
  { q: "How long does GST registration take?", a: "Usually 3 to 7 working days, once we have all your documents." },
  { q: "Can you do registration and the website together?", a: "Yes. Many clients start with registration and logo, then add a website. We offer combo prices." },
  { q: "How do I pay?", a: "You can pay by UPI, debit/credit card or bank transfer. You get a proper GST invoice." },
  { q: "I'm not sure which registration I need. Can you help?", a: "Yes — that's what the free consultation is for. Our expert will suggest the right option for you." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-x max-w-3xl">
        <SectionHead eyebrow="FAQ" title="Common Questions" />
        <div className="space-y-3">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className="rounded-2xl border border-line bg-white">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-navy"
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[15px]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  const site = useSite();
  return (
    <section className="py-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-royal to-navy px-6 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative text-3xl font-bold !text-white sm:text-4xl">Ready to Grow Your Business?</h2>
          <p className="relative mx-auto mt-3 max-w-lg text-[17px] text-white/85">
            Talk to our expert today. The first consultation is free.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-brand">Get Free Consultation</Link>
            <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="btn-ghost">
              <WaIcon /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <HeroSlider />
      <EnquiryBar />
      <CategoryBanners />
      <Popular />
      <Process />
      <WhyAndReviews />
      <Faq />
      <CtaBand />
    </>
  );
}
