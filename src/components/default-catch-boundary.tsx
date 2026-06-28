import {
  type ErrorComponentProps,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";

export const DefaultCatchBoundary = ({ error }: ErrorComponentProps) => {
  const router = useRouter();
  const isRoot = useMatch({
    select: (state) => state.id === rootRouteId,
    strict: false,
  });

  console.error("DefaultCatchBoundary Error:", error);

  return (
    <div className="max-w-2xl mx-auto mt-[5vh] flex flex-col gap-4">
      <h1 className="font-display font-medium text-3xl tracking-tight">
        Something went wrong
      </h1>
      <p className="text-sm text-neutral-400">{error.message}</p>
      <div className="flex gap-2 text-sm">
        <button
          type="button"
          className="underline"
          onClick={() => router.invalidate()}
        >
          Try again
        </button>
        {isRoot ? (
          <Link to="/" className="underline">
            Home
          </Link>
        ) : (
          <Link
            to="/"
            className="underline"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            Go back
          </Link>
        )}
      </div>
    </div>
  );
};
