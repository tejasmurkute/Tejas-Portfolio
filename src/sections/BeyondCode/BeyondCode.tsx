import { INTERESTS } from '@/data/interests';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { InterestCard } from '@/components/InterestCard/InterestCard';

export function BeyondCode() {
  return (
    <Section id="beyond" label="Life outside work">
      <div className="shell">
        <SectionHeader
          index="05"
          eyebrow="Off the clock"
          title="Beyond Code"
          subtitle="Life outside the screen"
        />

        {/* Asymmetric editorial grid: 7/5, 5/7, 4/8 across three rows on
            desktop, collapsing to a single reading column on mobile. */}
        <div className="mt-14 grid auto-rows-auto grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-12 lg:gap-6">
          {INTERESTS.map((item) => (
            <InterestCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
