import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Scale, Gavel, Landmark, BookOpen, Building2, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const areas = [
  {
    icon: Scale,
    title: "Civil Litigation",
    desc: "Our civil litigation practice handles a broad range of disputes, ensuring our clients' rights are protected through every stage of proceedings.",
    matters: ["Property & land disputes", "Contract enforcement & breach claims", "Injunctions & specific performance", "Recovery suits & money claims", "Landlord-tenant disputes", "Consumer protection matters"],
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=700",
  },
  {
    icon: Gavel,
    title: "Criminal Law",
    desc: "We provide robust defense and strategic prosecution support across criminal matters, from investigation to trial and appeal.",
    matters: ["Bail & anticipatory bail applications", "Trial defense & cross-examination", "White-collar & economic offences", "Criminal appeals & revisions", "Cheque bounce (NI Act) cases", "Cybercrime matters"],
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=700",
  },
  {
    icon: Landmark,
    title: "Constitutional Law",
    desc: "Our constitutional law practice addresses fundamental rights, government action, and public law matters at the highest levels.",
    matters: ["Writ petitions under Articles 226 & 32", "Fundamental rights enforcement", "Public interest litigation (PIL)", "Challenges to administrative orders", "Service & employment disputes", "Constitutional interpretation matters"],
    image: "https://images.unsplash.com/photo-1517417051851-36a6e0bf39b3?auto=format&fit=crop&q=80&w=700",
  },
  {
    icon: BookOpen,
    title: "Taxation Laws",
    desc: "We advise and represent clients in complex tax disputes, from assessment proceedings to appellate tribunals.",
    matters: ["Income tax assessment challenges", "GST disputes & advisory", "Tax tribunal representation", "Search & seizure proceedings", "Penalty & prosecution matters", "Tax planning & compliance advisory"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=700",
  },
  {
    icon: Building2,
    title: "Corporate & Commercial Law",
    desc: "Our corporate practice serves businesses with strategic legal counsel on commercial matters, compliance, and dispute resolution.",
    matters: ["Shareholder & partnership disputes", "Commercial contract disputes", "Regulatory compliance", "Intellectual property matters", "Corporate governance advisory", "Arbitration & mediation"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=700",
  },
  {
    icon: Users,
    title: "Family & Matrimonial Disputes",
    desc: "We handle sensitive family matters with discretion, empathy, and a firm commitment to achieving fair outcomes.",
    matters: ["Divorce & judicial separation", "Child custody & visitation rights", "Maintenance & alimony claims", "Domestic violence proceedings", "Adoption & guardianship", "Property division & settlement"],
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=700",
  },
];

const PracticeAreas = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-24 overflow-hidden min-h-[55vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&q=80&w=1600"
            alt="Law books"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/50" />
        </div>
        <div className="container-wide section-padding relative z-10">
          <ScrollReveal>
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">Practice Areas</span>
            <h1 className="text-primary-foreground max-w-3xl leading-tight mb-6">Expertise Across the Legal Spectrum</h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl leading-relaxed">
              Comprehensive legal services spanning civil, criminal, constitutional, tax, corporate, and family law.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Practice Areas List */}
      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <div className="space-y-24">
            {areas.map((area, i) => (
              <ScrollReveal key={area.title} delay={0}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Image side */}
                  <div className={`relative rounded-2xl overflow-hidden shadow-2xl group ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute top-5 left-5">
                      <div className="bg-primary/90 backdrop-blur-sm border border-gold/20 rounded-xl p-3 shadow-lg">
                        <area.icon className="w-6 h-6 text-gold" />
                      </div>
                    </div>
                    {/* Title on image */}
                    <div className="absolute bottom-5 left-5">
                      <span className="text-white font-heading text-lg font-semibold">{area.title}</span>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                    <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-3 block">Practice Area {String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">{area.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-7">{area.desc}</p>
                    <h4 className="text-[10px] tracking-[0.35em] uppercase font-bold text-gold mb-4">Matters We Handle</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                      {area.matters.map((matter) => (
                        <li key={matter} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                          {matter}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact">
                      <Button variant="outline" size="sm" className="tracking-widest uppercase text-xs font-bold">
                        Enquire About This Area <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
                {i !== areas.length - 1 && <div className="mt-24 border-t border-border" />}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600"
            alt="Courtroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="container-wide section-padding relative z-10 text-center">
          <ScrollReveal>
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">Let's Talk</span>
            <h2 className="text-primary-foreground mb-4">Not Sure Which Area Covers Your Matter?</h2>
            <p className="text-primary-foreground/55 text-lg mb-10 max-w-xl mx-auto">
              Our team will assess your situation and direct you to the right expertise. Book a confidential consultation today.
            </p>
            <Link to="/contact">
              <Button variant="gold" size="lg" className="px-10 tracking-widest uppercase text-xs font-bold">
                Book a Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreas;
