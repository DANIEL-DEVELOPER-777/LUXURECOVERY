interface SectionLabelProps {
  text: string;
}

const SectionLabel = ({ text }: SectionLabelProps) => (
  <p className="eyebrow mb-6">/ {text}</p>
);

export default SectionLabel;
