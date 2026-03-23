import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Scale, Gavel, Landmark, BookOpen, Building2, Users } from "lucide-react";

const areas = [
  {
    icon: Scale,
    title: "Civil Litigation",
    desc: "Our civil litigation practice handles a broad range of disputes, ensuring our clients' rights are protected through every stage of proceedings.",
    matters: ["Property & land disputes", "Contract enforcement & breach claims", "Injunctions & specific performance", "Recovery suits & money claims", "Landlord-tenant disputes", "Consumer protection matters"],
  },
  {
    icon: Gavel,
    title: "Criminal Law",
    desc: "We provide robust defense and strategic prosecution support across criminal matters, from investigation to trial and appeal.",
    matters: ["Bail & anticipatory bail applications", "Trial defense & cross-examination", "White-collar & economic offences", "Criminal appeals & revisions", "Cheque bounce (NI Act) cases", "Cybercrime matters"],
  },
  {
    icon: Landmark,
    title: "Constitutional Law",
    desc: "Our constitutional law practice addresses fundamental rights, government action, and public law matters at the highest levels.",
    matters: ["Writ petitions under Articles 226 & 32", "Fundamental rights enforcement", "Public interest litigation (PIL)", "Challenges to administrative orders", "Service & employment disputes", "Constitutional interpretation matters"],
  },
  {
    icon: BookOpen,
    title: "Taxation Laws",
    desc: "We advise and represent clients in complex tax disputes, from assessment proceedings to appellate tribunals.",
    matters: ["Income tax assessment challenges", "GST disputes & advisory", "Tax tribunal representation", "Search & seizure proceedings", "Penalty & prosecution matters", "Tax planning & compliance advisory"],
  },
  {
    icon: Building2,
    title: "Corporate & Commercial Law",
    desc: "Our corporate practice serves businesses with strategic legal counsel on commercial matters, compliance, and dispute resolution.",
    matters: ["Shareholder & partnership disputes", "Commercial contract disputes", "Regulatory compliance", "Intellectual property matters", "Corporate governance advisory", "Arbitration & mediation"],
  },
  {
    icon: Users,
    title: "Family & Matrimonial Disputes",
    desc: "We handle sensitive family matters with discretion, empathy, and a firm commitment to achieving fair outcomes.",
    matters: ["Divorce & judicial separation", "Child custody & visitation rights", "Maintenance & alimony claims", "Domestic violence proceedings", "Adoption & guardianship", "Property division & settlement"],
  },
];

const PracticeAreas = () => {
  return (
    <div>
      <section className="bg-primary pt-32 pb-20">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4 block">Practice Areas</span>
            <h1 className="text-primary-foreground max-w-3xl">Expertise Across the Legal Spectrum</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <div className="space-y-16">
            {areas.map((area, i) => (
              <ScrollReveal key={area.title} delay={0}>
                <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-start ${i !== areas.length - 1 ? "pb-16 border-b border-border" : ""}`}>
                  <div className="lg:col-span-2">
                    <area.icon className="w-10 h-10 text-gold mb-4" />
                    <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-3">{area.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{area.desc}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <h4 className="text-xs tracking-[0.3em] uppercase font-semibold text-gold-dark mb-4">Matters We Handle</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {area.matters.map((matter) => (
                        <li key={matter} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                          {matter}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreas;
