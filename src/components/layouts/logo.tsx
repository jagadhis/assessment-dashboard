import { Link } from 'react-router';

import { paths } from '@/config/paths';

/** A solid isometric cube: top, left and right faces in three shades. */
function CubeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2.5 20.5 7 12 11.5 3.5 7Z" fill="currentColor" opacity="0.72" />
      <path d="M3.5 7 12 11.5V21.5L3.5 17Z" fill="currentColor" />
      <path d="M20.5 7 12 11.5V21.5L20.5 17Z" fill="currentColor" opacity="0.86" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link
      to={paths.assessments.getHref()}
      className="flex size-10 items-center justify-center rounded-xl text-foreground"
    >
      <CubeMark className="size-7" />
      <span className="sr-only">Assessment dashboard home</span>
    </Link>
  );
}
