import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import faviconAsset from "@/assets/saltrock-favicon.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart-drawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Lost in the cellar</p>
        <h1 className="mt-6 text-7xl font-display text-gold">404</h1>
        <h2 className="mt-4 text-xl font-display">This vintage has moved</h2>
        <p className="mt-3 text-sm text-cream/60">
          The page you're looking for may have been recorked or reshelved.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-gold">Return home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something spilled</p>
        <h1 className="mt-6 text-3xl font-display">This page didn't pour</h1>
        <p className="mt-3 text-sm text-cream/60">
          Something went wrong on our end. Try again or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold">
            Try again
          </button>
          <a href="/" className="btn-ghost-gold">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Salt Rock Wines — Crafted by Nature. Perfected by Time." },
      { name: "description", content: "Salt Rock Wines: single-site Stellenbosch wines revealing the intricate connection between climate and terroir. Shop the cellar, join the club, and discover our story." },
      { name: "author", content: "Salt Rock Wines" },
      { property: "og:title", content: "Salt Rock Wines — Stellenbosch" },
      { property: "og:description", content: "Handpicked, single-site South African wines from the sundrenched vineyards of Stellenbosch." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Salt Rock Wines" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: faviconAsset.url, type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Salt Rock Wines",
              url: "/",
              logo: faviconAsset.url,
              sameAs: ["https://www.instagram.com/saltrockwines"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Stellenbosch",
                addressRegion: "Western Cape",
                addressCountry: "ZA",
              },
            },
            { "@type": "WebSite", name: "Salt Rock Wines", url: "/" },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}
