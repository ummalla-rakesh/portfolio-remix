import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import pagenotfound from '~/assets/404-error.svg';
import genericErrorImg from '~/assets/generic-error.svg';
import { Button } from '~/components/ui/button';

function ErrorContent({ title, image }: { title: string; image: string }) {
  return (
    <>
      <img src={image} alt={`${title} image`} />
      <h1>{`Oops! ${title}`}</h1>
      <div>
        <Button onClick={() => (window.location.href = '/')}>Go to Home</Button>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log('ErrorBoundary', error);
  return (
    <main className="container mx-auto px-6">
      {isRouteErrorResponse(error) ? (
        error.status === 404 ? (
          <ErrorContent title="Page Not Found" image={pagenotfound} />
        ) : error.status === 500 ? (
          <ErrorContent title="Internal Server Error" image={genericErrorImg} />
        ) : (
          <ErrorContent
            title={`${error.status} ${error.statusText}`}
            image={genericErrorImg}
          />
        )
      ) : error instanceof Error ? (
        <div>
          <ErrorContent title="Something Went Wrong" image={genericErrorImg} />
          <p>{error.message}</p>
        </div>
      ) : (
        <ErrorContent title="Something Went Wrong" image={genericErrorImg} />
      )}
    </main>
  );
}
