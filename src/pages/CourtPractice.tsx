import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Landmark, Building, Scale, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const courts = [
  {
    icon: Landmark,
    name: "High Court of Karnataka",
    desc: "Regular practice before the Principal Bench in Bengaluru — writ petitions, civil and criminal appeals, company matters, and special leave applications.",
  },
  {
    icon: Building,
    name: "Civil & Magistrate Courts",
    desc: "Active trial practice across Bengaluru's civil and criminal courts of original jurisdiction — suits, complaints, bail applications, and interlocutory matters.",
  },
  {
    icon: Building2,
    name: "District Courts & Tribunals",
    desc: "Representation before District and Sessions Courts, labour tribunals, consumer forums, and quasi-judicial bodies across Karnataka.",
  },
  {
    icon: Scale,
    name: "Supreme Court of India",
    desc: "Capability to handle Special Leave Petitions (SLPs), appeals, and matters of constitutional and national significance before the apex court.",
  },
];

const CourtPractice = () => {
  return (
    <div>
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/images/hero_legal.png"
            alt="Law Chambers"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide section-padding relative z-10">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4 block">Court Practice</span>
            <h1 className="text-primary-foreground max-w-3xl">Litigation & Court Practice</h1>
            <p className="text-primary-foreground/65 text-lg mt-4 max-w-2xl">
              From trial courts to the Supreme Court of India — comprehensive litigation capability across judicial forums.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courts.map((court, i) => (
              <ScrollReveal key={court.name} delay={i * 100}>
                <div className="bg-card rounded border border-border p-8 h-full hover:border-gold/30 hover:shadow-lg transition-all duration-300">
                  <court.icon className="w-10 h-10 text-gold mb-5" />
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">{court.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{court.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading
                eyebrow="Full Spectrum"
                title="From Trial to Appeals"
                description="Our advocates are equipped to handle matters at every stage — from initial filing and trial proceedings to appeals, revisions, and Special Leave Petitions before the Supreme Court of India."
              />
              <Link to="/contact">
                <Button variant="gold" size="lg">
                  Discuss Your Case <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default CourtPractice;
