import { PageShell } from '@/components/layout/PageShell';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground text-center max-w-md">{description}</p>
      </div>
    </PageShell>
  );
}
