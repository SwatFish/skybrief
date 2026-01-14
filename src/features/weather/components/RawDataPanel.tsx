import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RawDataPanelProps {
  title: string;
  data: string;
  defaultOpen?: boolean;
  className?: string;
}

export function RawDataPanel({ title, data, defaultOpen = false, className }: RawDataPanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('border border-border/50 rounded-lg overflow-hidden', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className="text-xs text-muted-foreground">Raw Data</span>
      </button>

      {isOpen && (
        <div className="relative">
          <pre className="raw-text m-3 overflow-x-auto whitespace-pre-wrap break-all">
            {data}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 rounded bg-secondary/50 hover:bg-secondary transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-safe" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
