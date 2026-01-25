"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">
        Something went wrong!
      </h2>
      <p className="text-slate-800 mb-8 max-w-md">
        We encountered an error while trying to fetch User data. Please try
        again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-primary-admin px-6 py-2 rounded-lg text-white font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
