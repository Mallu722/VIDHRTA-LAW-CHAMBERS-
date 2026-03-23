import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Scale, Shield, BookOpen, Users, ArrowRight, Gavel, Building2, Landmark } from "lucide-react";

const practiceAreas = [
  { icon: Scale, title: "Civil Litigation", desc: "Property disputes, contract enforcement, injunctions, and civil remedies" },
  { icon: Gavel, title: "Criminal Law", desc: "Bail applications, trial defense, appeals, and white-collar matters" },
  { icon: Landmark, title: "Constitutional Law", desc: "Writ petitions, fundamental rights, and public interest litigation" },
  { icon: BookOpen, title: "Taxation Laws", desc: "Direct & indirect tax disputes, assessment challenges, and tribunal matters" },
  { icon: Building2, title: "Corporate Law", desc: "Business advisory, commercial disputes, and regulatory compliance" },
  { icon: Users, title: "Family Law", desc: "Divorce, custody, maintenance, and matrimonial dispute resolution" },
];

const strengths = [
  { title: "Strategic Drafting", desc: "Meticulously crafted legal documents that withstand judicial scrutiny." },
  { title: "Courtroom Excellence", desc: "Seasoned advocates with extensive trial and appellate experience." },
  { title: "Client-First Approach", desc: "Transparent communication and personalized legal strategies." },
  { title: "Multi-Disciplinary Team", desc: "Cross-practice expertise for comprehensive legal solutions." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_legal.png" 
            alt="Vidhrta Law Chambers Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
        </div>
        <div className="container-wide section-padding relative z-10 pt-28 pb-20">
          <div className="max-w-3xl">
            <ScrollReveal delay={100}>
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6 block">
                Bengaluru-Based Litigation & Advisory
              </span>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <h1 className="text-primary-foreground mb-6 text-balance leading-[1.05]">
                Precision in Law.{" "}
                <span className="text-gold italic">Strength</span> in Advocacy.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <p className="text-primary-foreground/65 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                Vidhrta Law Chambers delivers strategic counsel and vigorous representation across trial courts, tribunals, and the High Court of Karnataka.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={550}>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button variant="hero">Book a Consultation</Button>
                </Link>
                <Link to="/practice-areas">
                  <Button variant="outline-light">
                    Our Practice <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats strip */}
          <ScrollReveal delay={700}>
            <div className="mt-20 pt-10 border-t border-primary-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "6+", label: "Practice Areas" },
                { value: "12+", label: "Legal Professionals" },
                { value: "4", label: "Courts Covered" },
                { value: "Bengaluru", label: "Headquarters" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="text-gold font-heading text-3xl md:text-4xl font-semibold">{stat.value}</span>
                  <span className="block text-primary-foreground/50 text-xs tracking-wider uppercase mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Practice Areas"
              title="Comprehensive Legal Expertise"
              description="From courtroom litigation to strategic advisory, we cover the full spectrum of legal needs."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 80}>
                <Link
                  to="/practice-areas"
                  className="group block p-8 bg-card rounded border border-border hover:border-gold/30 hover:shadow-xl transition-all duration-300"
                >
                  <area.icon className="w-8 h-8 text-gold mb-5 transition-transform duration-200 group-hover:scale-110" />
                  <h3 className="text-xl mb-3 font-heading font-semibold text-foreground">{area.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{area.desc}</p>
                  <span className="mt-4 inline-flex items-center text-xs tracking-wider uppercase text-gold-dark font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Built on Integrity, Driven by Results"
              light
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {strengths.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="gold-border-left pl-6 py-2">
                  <h4 className="text-primary-foreground font-heading text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Approach */}
      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <SectionHeading
                eyebrow="Our Approach"
                title="Client-Centered Legal Practice"
                align="left"
              />
              <div className="space-y-6">
                {[
                  { title: "Personalized Strategy", desc: "Every case receives a tailored legal roadmap aligned with your specific objectives." },
                  { title: "Complete Transparency", desc: "Clear fee structures and regular case updates — no surprises." },
                  { title: "Strict Confidentiality", desc: "Your information is protected with the highest standards of professional secrecy." },
                  { title: "Clear Legal Opinions", desc: "We distill complex law into actionable, straightforward advice." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <Shield className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative group overflow-hidden rounded-lg shadow-2xl">
                <img 
                  src="/images/scales_of_justice.png" 
                  alt="Scales of Justice" 
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white">
                    <blockquote className="font-heading text-lg italic leading-snug mb-2">
                      "Justice is the constant and perpetual will to allot to every man his due."
                    </blockquote>
                    <cite className="text-white/80 text-xs not-italic tracking-wider uppercase">— Justinian I</cite>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-6">
                   <div className="bg-secondary/90 backdrop-blur-sm p-4 rounded shadow-lg border border-gold/20">
                      <Scale className="w-8 h-8 text-gold" />
                   </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gold-light">
        <div className="container-wide section-padding text-center">
          <ScrollReveal>
            <h2 className="text-foreground mb-4">Ready to Discuss Your Case?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Schedule a confidential consultation with our team to explore your legal options.
            </p>
            <Link to="/contact">
              <Button variant="gold" size="lg">
                Contact Us Today <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
