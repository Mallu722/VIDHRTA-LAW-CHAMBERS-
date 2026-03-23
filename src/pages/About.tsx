import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Heart, ShieldCheck } from "lucide-react";

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "We uphold the highest ethical standards in every engagement, maintaining complete honesty and transparency." },
  { icon: Target, title: "Professionalism", desc: "Our practice is defined by meticulous preparation, disciplined advocacy, and unwavering commitment to excellence." },
  { icon: Heart, title: "Client Commitment", desc: "We treat every client's matter with urgency and dedication, ensuring their interests are always at the forefront." },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4 block">About Us</span>
            <h1 className="text-primary-foreground max-w-3xl">A Tradition of Legal Excellence in Bengaluru</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <SectionHeading eyebrow="Our Story" title="Vidhrta Law Chambers" align="left" />
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Vidhrta Law Chambers is a Bengaluru-based litigation and advisory firm built on the principles of precision, integrity, and client-centered advocacy. Founded with a commitment to delivering strategic legal solutions, the firm has established itself as a trusted partner for individuals, families, and businesses navigating complex legal landscapes.
                </p>
                <p>
                  Our team of experienced advocates practices across multiple courts in Karnataka and beyond, handling matters from trial to appellate stages with equal rigour and dedication. We combine deep legal knowledge with practical courtroom experience to deliver outcomes that matter.
                </p>
                <p>
                  At Vidhrta, we believe that effective legal representation begins with understanding — understanding the law, understanding the facts, and most importantly, understanding our client's objectives.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div className="relative rounded-lg overflow-hidden shadow-xl mb-8">
                  <img
                    src="/images/law_chambers_meeting.png"
                    alt="Vidhrta Law Chambers Meeting Room"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                </div>
                <div className="bg-primary rounded p-8 md:p-10">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Eye className="w-6 h-6 text-gold" />
                      <h3 className="text-primary-foreground font-heading text-xl font-semibold">Vision</h3>
                    </div>
                    <p className="text-primary-foreground/65 text-sm leading-relaxed">
                      To be a leading litigation practice in Karnataka, recognized for the quality of our advocacy, the strength of our counsel, and the depth of our client relationships.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-gold" />
                      <h3 className="text-primary-foreground font-heading text-xl font-semibold">Mission</h3>
                    </div>
                    <p className="text-primary-foreground/65 text-sm leading-relaxed">
                      To provide accessible, ethical, and results-driven legal services — combining rigorous preparation with bold advocacy to protect our clients' rights and advance their interests at every stage of proceedings.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <SectionHeading eyebrow="Our Values" title="The Principles That Guide Us" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="bg-card rounded p-8 border border-border text-center h-full">
                  <v.icon className="w-10 h-10 text-gold mx-auto mb-5" />
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
