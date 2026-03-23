import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Scale, Shield, BookOpen, Users, ArrowRight, Gavel, Building2, Landmark, ChevronDown, Star, Phone } from "lucide-react";

const practiceAreas = [
  { icon: Scale, title: "Civil Litigation", desc: "Property disputes, contract enforcement, injunctions, and civil remedies", href: "/practice-areas" },
  { icon: Gavel, title: "Criminal Law", desc: "Bail applications, trial defense, appeals, and white-collar matters", href: "/practice-areas" },
  { icon: Landmark, title: "Constitutional Law", desc: "Writ petitions, fundamental rights, and public interest litigation", href: "/practice-areas" },
  { icon: BookOpen, title: "Taxation Laws", desc: "Direct & indirect tax disputes, assessment challenges, and tribunal matters", href: "/practice-areas" },
  { icon: Building2, title: "Corporate Law", desc: "Business advisory, commercial disputes, and regulatory compliance", href: "/practice-areas" },
  { icon: Users, title: "Family Law", desc: "Divorce, custody, maintenance, and matrimonial dispute resolution", href: "/practice-areas" },
];

const strengths = [
  { title: "Strategic Drafting", desc: "Meticulously crafted legal documents that withstand judicial scrutiny." },
  { title: "Courtroom Excellence", desc: "Seasoned advocates with extensive trial and appellate experience." },
  { title: "Client-First Approach", desc: "Transparent communication and personalized legal strategies." },
  { title: "Multi-Disciplinary Team", desc: "Cross-practice expertise for comprehensive legal solutions." },
];

const testimonials = [
  { name: "Rajesh M.", role: "Corporate Client", quote: "Vidhrta Law Chambers handled our commercial dispute with exceptional expertise. Their strategic approach secured a favorable outcome.", rating: 5 },
  { name: "Priya S.", role: "Family Law Client", quote: "Professional, empathetic, and thorough. They guided me through a difficult time with clarity and compassion.", rating: 5 },
  { name: "Arun K.", role: "Property Dispute", quote: "Remarkable depth of legal knowledge. The team anticipated every challenge and prepared us comprehensively.", rating: 5 },
];

const Index = () => {
  return (
    <div>
      {/* Hero — Full Viewport */}
      <section className="relative h-screen min-h-[700px] flex flex-col items-start justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_legal.png"
            alt="Vidhrta Law Chambers Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        </div>

        {/* Decorative gold line accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-gold to-transparent opacity-60 z-10" />

        {/* Content */}
        <div className="container-wide section-padding relative z-10 w-full">
          <div className="max-w-3xl">
            <ScrollReveal delay={100}>
              <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-bold mb-6 block opacity-90">
                Bengaluru-Based Litigation & Advisory
              </span>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <h1 className="text-primary-foreground mb-2 leading-[1.05] text-5xl md:text-6xl lg:text-7xl font-heading font-semibold">
                Precision in Law.
              </h1>
              <h1 className="text-primary-foreground mb-8 leading-[1.05] text-5xl md:text-6xl lg:text-7xl font-heading font-semibold">
                <span className="text-gold italic">Strength</span> in Advocacy.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-light">
                Vidhrta Law Chambers delivers strategic counsel and vigorous representation across trial courts, tribunals, and the High Court of Karnataka.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={550}>
              <div className="flex flex-wrap gap-4 mb-16">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="px-8 py-4 text-sm tracking-widest uppercase font-bold">
                    Book a Consultation
                  </Button>
                </Link>
                <Link to="/practice-areas">
                  <Button variant="outline-light" size="lg" className="px-8 py-4 text-sm tracking-widest uppercase font-bold">
                    Our Practice <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal delay={650}>
              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/40 text-[10px] uppercase tracking-widest font-bold">
                <span className="flex items-center gap-2"><Shield className="w-3 h-3 text-gold" /> Confidential</span>
                <span className="w-px h-4 bg-current opacity-20" />
                <span className="flex items-center gap-2"><Scale className="w-3 h-3 text-gold" /> High Court Registered</span>
                <span className="w-px h-4 bg-current opacity-20" />
                <span className="flex items-center gap-2"><Gavel className="w-3 h-3 text-gold" /> 10+ Years Experience</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats bar — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-primary-foreground/10 backdrop-blur-sm bg-primary/40">
          <ScrollReveal delay={700}>
            <div className="container-wide section-padding py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "6+", label: "Practice Areas" },
                { value: "12+", label: "Legal Professionals" },
                { value: "4", label: "Courts Covered" },
                { value: "Bengaluru", label: "Headquarters" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <span className="text-gold font-heading text-2xl md:text-3xl font-semibold block">{stat.value}</span>
                  <span className="text-primary-foreground/50 text-[10px] tracking-wider uppercase mt-0.5 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-24 right-10 z-10 hidden lg:flex flex-col items-center gap-2 text-primary-foreground/30">
          <span className="text-[9px] tracking-[0.4em] uppercase rotate-90 origin-center translate-y-6">Scroll</span>
          <span className="w-px h-16 bg-gradient-to-b from-transparent to-current" />
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Practice Areas"
              title="Comprehensive Legal Expertise"
              description="From courtroom litigation to strategic advisory, we cover the full spectrum of legal needs across Karnataka's courts and tribunals."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {practiceAreas.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 80}>
                <Link
                  to={area.href}
                  className="group block p-8 bg-card rounded-lg border border-border hover:border-gold/40 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover gold accent */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold to-gold/0 group-hover:w-full transition-all duration-500" />
                  <area.icon className="w-9 h-9 text-gold mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                  <h3 className="text-xl mb-3 font-heading font-semibold text-foreground group-hover:text-gold transition-colors duration-200">{area.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{area.desc}</p>
                  <span className="mt-5 inline-flex items-center text-[10px] tracking-widest uppercase text-gold font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                    Learn more <ArrowRight className="w-3 h-3 ml-1.5" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={300}>
            <div className="text-center mt-12">
              <Link to="/practice-areas">
                <Button variant="outline" className="px-10 tracking-widest uppercase text-xs font-bold">
                  View All Practice Areas <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-36 bg-primary relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #d4a843 0, #d4a843 1px, transparent 0, transparent 50%)", backgroundSize: "40px 40px" }}
        />
        <div className="container-wide section-padding relative z-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Built on Integrity, Driven by Results"
              description="Our reputation is founded on principled advocacy, meticulous preparation, and an unwavering commitment to our clients."
              light
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {strengths.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="group gold-border-left pl-7 py-3 hover:pl-9 transition-all duration-300">
                  <h4 className="text-primary-foreground font-heading text-xl font-semibold mb-2 group-hover:text-gold transition-colors duration-200">{item.title}</h4>
                  <p className="text-primary-foreground/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Approach */}
      <section className="py-24 md:py-36">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <SectionHeading
                eyebrow="Our Approach"
                title="Client-Centered Legal Practice"
                align="left"
              />
              <div className="space-y-7 mt-10">
                {[
                  { title: "Personalized Strategy", desc: "Every case receives a tailored legal roadmap aligned with your specific objectives." },
                  { title: "Complete Transparency", desc: "Clear fee structures and regular case updates — no surprises." },
                  { title: "Strict Confidentiality", desc: "Your information is protected with the highest standards of professional secrecy." },
                  { title: "Clear Legal Opinions", desc: "We distill complex law into actionable, straightforward advice." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 group">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mt-0.5 group-hover:bg-gold/20 transition-colors duration-200">
                      <Shield className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/contact">
                  <Button variant="gold" className="px-10 tracking-widest uppercase text-xs font-bold">
                    <Phone className="w-3.5 h-3.5 mr-2" /> Schedule a Consultation
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative group overflow-hidden rounded-xl shadow-2xl border border-border">
                <img
                  src="/images/scales_of_justice.png"
                  alt="Scales of Justice"
                  className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                {/* Floating quote */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <blockquote className="font-heading text-lg italic text-white/90 leading-snug mb-2">
                    "Justice is the constant and perpetual will to allot to every man his due."
                  </blockquote>
                  <cite className="text-gold text-[10px] not-italic tracking-widest uppercase font-bold">— Justinian I</cite>
                </div>
                {/* Top-right badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-primary/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gold/20">
                    <Scale className="w-7 h-7 text-gold" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-36 bg-slate-50/80">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Client Testimonials"
              title="Trusted by Our Clients"
              description="The words of those we have had the privilege to represent."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="group bg-white border border-border rounded-xl p-8 hover:border-gold/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold to-gold/0 group-hover:w-full transition-all duration-500" />
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-gold fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground/75 text-sm leading-relaxed italic mb-6 border-l-2 border-gold/30 pl-4">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      {t.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #d4a843 0, #d4a843 1px, transparent 0, transparent 50%)", backgroundSize: "40px 40px" }}
        />
        <div className="container-wide section-padding text-center relative z-10">
          <ScrollReveal>
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">Begin Today</span>
            <h2 className="text-primary-foreground mb-4 max-w-2xl mx-auto">Ready to Discuss Your Case?</h2>
            <p className="text-primary-foreground/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Schedule a confidential consultation with our team to explore your legal options and chart a clear path forward.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="gold" size="lg" className="px-10 tracking-widest uppercase text-xs font-bold">
                  Contact Us Today <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/team">
                <Button variant="outline-light" size="lg" className="px-10 tracking-widest uppercase text-xs font-bold">
                  Meet the Team
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
