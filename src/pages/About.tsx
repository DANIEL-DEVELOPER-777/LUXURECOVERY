import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldDivider from "@/components/GoldDivider";
import penthouseImg from "@/assets/penthouse-aerial.jpg";


const standards = [
  "Critical care and PACU-trained nurses exclusively — no agency staff, no rotation",
  "Your nurse is assigned to you. Not a pool.",
  "HIPAA-compliant documentation and encrypted communications on every case",
  "Direct surgeon communication protocols, standard on every case",
  "Continuous vital sign monitoring and clinical documentation throughout",
];

const AboutPage = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="relative py-32 md:py-44">
      <div className="absolute inset-0">
        <img src={penthouseImg} alt="Luxury setting" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>
      <div className="relative container-luxe max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="font-display font-light italic text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.2] text-balance">
            "We built Luxurecovery because recovery deserves the same level of excellence as surgery."
          </h1>
        </ScrollReveal>
      </div>
    </section>

    {/* The Founding */}
    <section className="section-padding">
      <div className="container-luxe max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="THE FOUNDING" />
          <h2 className="headline-section mb-8">Born From the Bedside</h2>
          <div className="space-y-6 body-copy text-muted-foreground">
            <p>
              Luxurecovery was founded by two critical care nurses who saw the same gap
              repeatedly — patients investing tens of thousands of dollars in world-class
              surgery, then discharged into recovery without any professional support.
            </p>
            <p>
              Preventable complications. Compromised outcomes. Patients navigating the most
              vulnerable phase of their surgical journey alone.
            </p>
            <p>We built something different.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <GoldDivider />

    {/* The Founders */}
    <section className="section-padding">
      <div className="container-luxe">
        <ScrollReveal>
          <SectionLabel text="THE FOUNDERS" />
        </ScrollReveal>
        <div className="max-w-3xl">
          <div className="space-y-10">
            <ScrollReveal delay={0.1}>
              <h3 className="font-display text-xl md:text-2xl mb-3">
                Erin Welch, RN, BSN — <span className="italic">Co-Founder</span>
              </h3>
              <p className="body-copy text-muted-foreground">
                17 years of critical care nursing. Erin has personally staffed hundreds of
                post-operative cases and built the surgeon relationships that define
                Luxurecovery's clinical reputation. She oversees every client journey from
                first call to case close.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h3 className="font-display text-xl md:text-2xl mb-3">
                Nevinsthon Alcindor, RN, BSN — <span className="italic">Co-Founder</span>
              </h3>
              <p className="body-copy text-muted-foreground">
                13 years of critical care nursing. Nev has worked alongside Erin at the
                bedside across hundreds of recovery cases and leads Luxurecovery's clinical
                innovation, operations, and advanced therapy integrations.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="body-copy text-muted-foreground border-l-2 border-accent pl-6">
                Together, they have delivered over 200 client recoveries and accumulated
                thousands of hours of hands-on post-operative nursing — much of it personally.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>

    <GoldDivider />

    {/* Philosophy */}
    <section className="section-padding bg-secondary">
      <div className="container-luxe max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <SectionLabel text="OUR PHILOSOPHY" />
          <h2 className="font-display font-light italic text-3xl md:text-5xl leading-[1.2] mb-8 text-balance">
            This is not home care.<br />This is private recovery.
          </h2>
          <p className="body-copy mx-auto text-muted-foreground">
            Every detail mirrors the precision of surgery itself — the caliber of our
            nurses, our communication protocols, the environments we operate in. Nothing
            is left to chance.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Standards */}
    <section className="section-padding">
      <div className="container-luxe max-w-3xl">
        <ScrollReveal>
          <SectionLabel text="OUR STANDARDS" />
          <h2 className="headline-section mb-12">Non-Negotiable</h2>
        </ScrollReveal>
        <div className="space-y-6">
          {standards.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex items-start gap-4 py-4 border-b border-border">
                <span className="text-accent mt-1">—</span>
                <p className="font-body text-base md:text-lg">{s}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="section-padding bg-secondary">
      <div className="container-luxe max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <SectionLabel text="OUR MISSION" />
          <h2 className="font-display font-light italic text-3xl md:text-5xl leading-[1.2] text-balance">
            Recovery is where outcomes are made.<br />
            We exist to ensure yours is extraordinary.
          </h2>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default AboutPage;
