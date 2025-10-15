import { domains } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Briefcase, DollarSign, Lightbulb, Megaphone, Shield } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Briefcase,
  DollarSign,
  Lightbulb,
  Shield,
  Megaphone,
  BrainCircuit,
};

export default function DomainsPage() {
  return (
    <section id="domains" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Our Focus Areas</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We champion innovation across a diverse range of business and technology sectors.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain) => {
            const Icon = iconMap[domain.icon];
            return (
              <Card key={domain.id} className="glass-card text-center group">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {Icon && <Icon className="w-12 h-12 text-primary transition-transform duration-300 group-hover:scale-110" />}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{domain.name}</CardTitle>
                  <CardDescription>{domain.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
