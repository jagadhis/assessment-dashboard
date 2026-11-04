import { Box } from 'lucide-react';
import { Link } from 'react-router';

export function Logo() {
  return (
    <Link
      to="/assessments"
      className="flex size-10 items-center justify-center rounded-xl text-foreground"
    >
      <Box className="size-7" strokeWidth={2.25} aria-hidden />
      <span className="sr-only">Assessment dashboard home</span>
    </Link>
  );
}
