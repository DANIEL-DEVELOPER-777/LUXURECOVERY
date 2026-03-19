import HeroSection from "@/components/HeroSection";
import TiersSection from "@/components/TiersSection";
import WaitlistForm from "@/components/WaitlistForm";

const Regenerative = () => {
  return (
    <div className="min-h-screen bg-background">
      <div style={{ height: '50px', width: '10px' }}></div>
      <HeroSection />

      {/* Divider */}
      <div className="flex justify-center">
        <div className="w-16 h-px bg-gold/20" />
      </div>

      <TiersSection />

      {/* Divider */}
      <div className="flex justify-center">
        <div className="w-16 h-px bg-gold/20" />
      </div>

      <WaitlistForm />

      {/* Footer note */}
      <footer className="pb-16 pt-8 px-6 text-center">
        <p className="font-body text-xs italic text-muted-foreground/50 max-w-lg mx-auto">
          Membership availability is limited per tier. Early access requests are
          reviewed in the order received.
        </p>
      </footer>
    </div>
  );
};

export default Regenerative;


// import ScrollReveal from "@/components/ScrollReveal";
// import GoldDivider from "@/components/GoldDivider";
// import { Link } from "react-router-dom";

// const protocols = [
//   {
//     name: "LUMINAE",
//     price: "$38,000/year",
//     position: "Your cellular foundation. The entry point into biology-first recovery.",
//     summary:
//       "Starting with bi-annual exosome therapy, quarterly NAD+ protocols, HBOT, and your personal Acorn cell banking enrollment — delivered by your dedicated care coordinator on a schedule that fits your life.",
//   },
//   {
//     name: "NOVARE",
//     price: "$72,000/year",
//     position: "Built for performance. Designed around your biology.",
//     summary:
//       "Quarterly exosome infusions, weekly IV protocols, and your OxyHealth hyperbaric chamber — installed in your home, yours to keep.",
//   },
//   {
//     name: "SOVEREIGN",
//     price: "$110,000/year",
//     position: "Nothing rationed. Every system, optimized.",
//     summary:
//       "Monthly MSC exosome therapy, weekly NAD+ and Glutathione protocols, Acorn secretome treatments from your own banked cells, and a named physician who knows you by chart and by name.",
//   },
//   {
//     name: "AUREUS",
//     price: "$150,000/year",
//     position: "The only membership of its kind.",
//     summary:
//       "Everything in Sovereign, plus clinical care at altitude. In partnership with Air Nurses, Aureus members receive flight nursing on private jet travel — IV therapy, monitoring, and recovery protocols wherever you fly. Inquire for details.",
//   },
// ];

// const Regenerative = () => (
//   <div className="pt-20">
//     {/* Hero */}
//     <section className="section-padding bg-foreground">
//       <div className="container-luxe max-w-4xl">
//         <ScrollReveal>
//           <p className="eyebrow text-accent mb-6">/ REGENERATIVE PROGRAMS</p>
//           <h1 className="headline-hero text-primary-foreground mb-6">
//             Cellular Renewal.<br />Optimized for You.
//           </h1>
//           <p className="font-body text-primary-foreground/60 text-lg max-w-2xl leading-relaxed">
//             Precision biologics, regenerative IV protocols, and advanced therapeutics —
//             delivered with the discretion and care of a private concierge.
//           </p>
//         </ScrollReveal>
//       </div>
//     </section>

//     {/* Protocols */}
//     {protocols.map((p, i) => (
//       <section key={p.name} className={`section-padding ${i % 2 === 1 ? "bg-secondary" : ""}`}>
//         <div className="container-luxe max-w-3xl">
//           <ScrollReveal>
//             <p className="eyebrow text-accent mb-3">{p.name}</p>
//             <p className="font-display font-light text-3xl md:text-4xl text-accent mb-4">
//               {p.price}
//             </p>
//             <p className="font-display italic text-lg md:text-xl text-foreground/80 mb-6">
//               {p.position}
//             </p>
//             <p className="font-body text-muted-foreground text-base leading-relaxed">
//               {p.summary}
//             </p>
//           </ScrollReveal>
//         </div>
//       </section>
//     ))}

//     <GoldDivider />

//     {/* CTA */}
//     <section className="section-padding">
//       <div className="container-luxe text-center">
//         <ScrollReveal>
//           <p className="font-body text-muted-foreground text-base mb-10 max-w-xl mx-auto leading-relaxed">
//             Full protocol details, pricing breakdowns, and personalized recommendations
//             are shared during your private consultation.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-flex font-body font-medium uppercase tracking-[0.12em] text-[11px] px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-primary-foreground transition-all"
//           >
//             Schedule a Consultation
//           </Link>
//         </ScrollReveal>
//       </div>
//     </section>
//   </div>
// );

// export default Regenerative;
