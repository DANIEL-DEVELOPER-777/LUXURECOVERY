import { motion } from "framer-motion";

const tiers = [
  {
    name: "Luminae",
    description:
      "The foundation. Biannual exosomes, quarterly NAD+, monthly Glutathione, and annual HBOT protocol.",
  },
  {
    name: "Novare",
    description:
      "For the high-performer. Quarterly exosomes, monthly IV protocols, 10 annual HBOT sessions at partner facilities, and your OxyHealth home chamber.",
  },
  {
    name: "Sovereign",
    description:
      "For those who demand measurable results. Monthly exosomes, weekly IV protocols, 20 annual HBOT sessions, and full home chamber ownership.",
  },
  {
    name: "Aureus",
    description:
      "The highest tier. Everything in Sovereign plus Air Nurses flight nursing, two complimentary annual recovery packages, and a named on-call physician.",
  },
];

const TierCard = ({
  tier,
  index,
}: {
  tier: (typeof tiers)[0];
  index: number;
}) => (
  <motion.div
    className="group relative border border-border/60 p-8 sm:p-10 hover:border-gold/30 transition-colors duration-700"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
  >
    {/* Tier number */}
    <span className="font-body text-xs tracking-[0.2em] text-muted-foreground/40 uppercase">
      Tier {String(index + 1).padStart(2, "0")}
    </span>

    <h3 className="font-display text-3xl sm:text-4xl font-light text-gold mt-3 mb-4">
      {tier.name}
    </h3>

    <p className="font-body text-sm text-muted-foreground leading-relaxed font-light mb-6">
      {tier.description}
    </p>

    <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground/60">
      Contact for details
    </p>
  </motion.div>
);

const TiersSection = () => (
  <section className="py-24 sm:py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16 sm:mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">
          Four Tiers
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground">
          Choose Your Level of Care
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
        {tiers.map((tier, i) => (
          <TierCard key={tier.name} tier={tier} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default TiersSection;
