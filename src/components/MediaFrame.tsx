import { useState } from 'react';
import { Wrench } from 'lucide-react';

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

  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-hairline)] ${className}`}
    >
      {!failed ? (
        <img
          src={src}
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
