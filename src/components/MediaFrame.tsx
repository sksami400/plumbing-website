import { useState } from 'react';
import { Wrench } from 'lucide-react';
import heroImg from '../assets/images/hero_plumbing_craft_1795430660931.jpg';
import septicImg from '../assets/images/septic_service_field_1795430660608.jpg';
import waterImg from '../assets/images/water_line_excavation_1795430661256.jpg';
import bathroomImg from '../assets/images/bathroom_fixture_detail_1795430660906.jpg';

const imageMap: Record<string, string> = {
  'hero_plumbing_craft_1795430660931.jpg': heroImg,
  'septic_service_field_1795430660608.jpg': septicImg,
  'water_line_excavation_1795430661256.jpg': waterImg,
  'bathroom_fixture_detail_1795430660906.jpg': bathroomImg,
};

function resolveSrc(src: string): string {
  if (!src) return src;
  for (const [filename, bundledUrl] of Object.entries(imageMap)) {
    if (src.includes(filename)) return bundledUrl;
  }
  if (src.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${src.slice(1)}`;
  }
  return src;
}

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  focalPoint?: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  focalPoint = 'center center',
  priority = false,
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = resolveSrc(src);

  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-hairline)] ${className}`}
    >
      {!failed ? (
        <img
          src={resolvedSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
          style={{ objectPosition: focalPoint }}
          className={`block w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center w-full h-full min-h-[240px] p-6 text-center bg-gradient-to-br from-[var(--bg-surface)] to-[var(--border-hairline)] text-[var(--ink-muted)]"
          role="img"
          aria-label={alt}
        >
          <Wrench className="w-7 h-7 mb-2 text-[var(--brand-primary)]" aria-hidden="true" />
          <span className="type-footer font-medium text-[var(--ink-primary)]">{alt}</span>
        </div>
      )}
    </div>
  );
}
