import { Link } from 'react-router';

import { isNotFound } from '@/api';
import { ErrorState } from '@/components/feedback/error-state';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

interface QueryErrorProps {
  error: Error;
  resource: string;
  onRetry: () => void;
}

export function QueryError({ error, resource, onRetry }: QueryErrorProps) {
  if (isNotFound(error)) {
    return (
      <ErrorState
        title={`${resource} not found`}
        description={`This ${resource.toLowerCase()} does not exist or you no longer have access to it.`}
        action={
          <Button asChild variant="outline">
            <Link to={paths.assessments.getHref()}>Back to assessments</Link>
          </Button>
        }
      />
    );
  }

  return (
    <ErrorState
      title={`Could not load this ${resource.toLowerCase()}`}
      description="Something went wrong while fetching the data. Check your connection and try again."
      action={
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      }
    />
  );
}
