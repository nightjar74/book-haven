import React from "react";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Too Many Requests
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        You’ve reached the rate limit for the moment. To ensure the best
        experience for everyone at Bookhaven, we ask that you wait a short while
        before making further requests.
      </p>
    </main>
  );
};
export default Page;
