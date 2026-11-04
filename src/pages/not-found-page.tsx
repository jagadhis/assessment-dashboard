import { Link } from 'react-router';

import { ErrorState } from '@/components/feedback/error-state';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

export function NotFoundPage() {
  return (
    <ErrorState
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
      action={
        <Button asChild variant="outline">
          <Link to={paths.assessments.getHref()}>Back to assessments</Link>
        </Button>
      }
    />
  );
}
