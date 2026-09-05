import { services } from "@/content/services";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Strategy, design and engineering under one roof."
      intro="Six capabilities that combine into one delivery team — so a product decision never waits on a hand-off."
    >
      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal as="li" key={service.number} delay={(i % 3) * 70}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default Services;
