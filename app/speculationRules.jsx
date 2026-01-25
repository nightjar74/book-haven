import Script from "next/script";

export function SpeculationRules({
  prefetchPathsOnHover = [],
  prerenderPathsOnHover = [],
  prerenderPathsImmediate = [],
  prefetchPathsImmediate = [],
  prerenderAllBooksOnHover = true,
  prerenderAllRoutesImmediately = false,
}) {
  const speculationRules = {
    prefetch: [
      ...(prefetchPathsImmediate.length > 0
        ? [{ urls: prefetchPathsImmediate, eagerness: "immediate" }]
        : []),
      ...(prefetchPathsOnHover.length > 0
        ? [{ urls: prefetchPathsOnHover, eagerness: "moderate" }]
        : []),
    ],
    prerender: [
      ...(prerenderAllBooksOnHover
        ? [
            {
              where: { href_matches: "/books/*" },
              eagerness: "moderate",
            },
          ]
        : []),

      ...(prerenderAllRoutesImmediately
        ? [
            {
              where: {
                and: [
                  { href_matches: "/*" },
                  { not: { href_matches: "/api/*" } },
                  { not: { href_matches: "/admin/*" } },
                  { not: { href_matches: "/auth/*" } },
                  { not: { href_matches: "/logout" } },
                  { not: { selector_matches: ".no-prerender" } },
                ],
              },
              eagerness: "immediate",
            },
          ]
        : []),

      ...(prerenderPathsImmediate.length > 0
        ? [{ urls: prerenderPathsImmediate, eagerness: "immediate" }]
        : []),
      ...(prerenderPathsOnHover.length > 0
        ? [{ urls: prerenderPathsOnHover, eagerness: "moderate" }]
        : []),
    ],
  };

  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(speculationRules),
      }}
      type="speculationrules"
      id="speculation-rules"
      strategy="afterInteractive"
    />
  );
}
