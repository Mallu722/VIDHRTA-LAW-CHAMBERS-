import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

const partners = [
  {
    name: "Akshay R Huddar",
    role: "Partner",
    focus: "Civil Litigation, Constitutional Law",
    bio: "Akshay brings sharp analytical thinking and persuasive advocacy to the firm's civil and constitutional practice. With experience spanning the High Court of Karnataka and district courts, he is known for his meticulous preparation and strategic approach to complex disputes.",
  },
  {
    name: "Abhishek R Huddar",
    role: "Partner",
    focus: "Criminal Law, Corporate Advisory",
    bio: "Abhishek combines rigorous legal scholarship with courtroom dynamism. His practice encompasses criminal defense, corporate advisory, and commercial litigation, with a particular strength in navigating multi-jurisdictional matters.",
  },
  {
    name: "Madan K S",
    role: "Partner",
    focus: "Taxation, Commercial Litigation",
    bio: "Madan's expertise in taxation law and commercial disputes makes him an invaluable counsel for businesses and individuals alike. His methodical approach to litigation and deep understanding of fiscal legislation has earned the trust of a broad client base.",
  },
];

const associates = [
  { name: "Yallalingeshwar", focus: "Civil Litigation" },
  { name: "Chandrashekar H", focus: "Criminal Law" },
  { name: "Vasushrutha Sharma", focus: "Constitutional & Family Law" },
  { name: "Chandra", focus: "Corporate Law" },
  { name: "Karthik", focus: "Taxation" },
  { name: "Madeva", focus: "Civil Litigation" },
  { name: "Deepashree", focus: "Family & Matrimonial Law" },
  { name: "Drupad", focus: "Criminal & Commercial Law" },
];

const Team = () => {
  return (
    <div>
      <section className="bg-primary pt-32 pb-20">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4 block">Our Team</span>
            <h1 className="text-primary-foreground max-w-3xl">The People Behind the Practice</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <SectionHeading eyebrow="Partners" title="Leadership" />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partners.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 100}>
                <div className="bg-card rounded border border-border overflow-hidden h-full flex flex-col">
                  <div className="bg-primary p-8 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-navy-light flex items-center justify-center shrink-0">
                      <span className="text-gold font-heading text-2xl font-semibold">
                        {p.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-primary-foreground font-heading text-xl font-semibold">{p.name}</h3>
                      <span className="text-gold text-xs tracking-widest uppercase">{p.role}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1">
                    <span className="text-xs tracking-wider uppercase text-gold-dark font-semibold block mb-3">{p.focus}</span>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Associates */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <SectionHeading eyebrow="Associates" title="Our Advocates" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {associates.map((a, i) => (
              <ScrollReveal key={a.name} delay={i * 60}>
                <div className="bg-card rounded border border-border p-6 text-center hover:border-gold/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gold font-heading text-lg font-semibold">
                      {a.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-1">{a.name}</h4>
                  <span className="text-xs text-muted-foreground tracking-wide">Associate</span>
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-gold-dark font-medium">{a.focus}</span>
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

export default Team;
