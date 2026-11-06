import { renderToStaticMarkup } from "react-dom/server";
import RootLayout, { metadata } from "@/app/layout";

jest.mock("@/components", () => ({
  Navbar: () => <nav data-testid="navbar" />,
  Footer: () => <footer data-testid="footer" />,
}));

jest.mock("react-hot-toast", () => ({
  Toaster: ({ position }: { position: string }) => (
    <div data-testid="toaster" data-position={position} />
  ),
}));

const mockScript = jest.fn();
jest.mock("next/script", () => ({
  __esModule: true,
  default: (props: { id: string; type: string; children: string }) => {
    mockScript(props);
    return <script id={props.id} type={props.type} />;
  },
}));

const renderLayout = () =>
  renderToStaticMarkup(
    <RootLayout>
      <p>Page content</p>
    </RootLayout>,
  );

describe("RootLayout", () => {
  it("renders the document shell in English with the dark theme", () => {
    const html = renderLayout();
    expect(html).toMatch(/^<html lang="en" class="dark">/);
    expect(html).toContain('<meta name="theme-color" content="#030014"/>');
  });

  it("links the web manifest and RSS feed", () => {
    const html = renderLayout();
    expect(html).toContain('<link rel="manifest" href="/manifest.json"/>');
    expect(html).toContain(
      '<link rel="alternate" type="application/rss+xml" title="RSS Feed for Ranj Sidhu" href="/feed.xml"/>',
    );
  });

  it("renders the navbar, page content, toaster and footer in order", () => {
    const html = renderLayout();
    const order = [
      'data-testid="navbar"',
      '<main class="pt-16"><p>Page content</p></main>',
      'data-testid="toaster" data-position="top-right"',
      'data-testid="footer"',
    ].map((fragment) => html.indexOf(fragment));

    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("embeds Person structured data as JSON-LD", () => {
    renderLayout();
    const props = mockScript.mock.calls[0][0];
    expect(props.id).toBe("json-ld");
    expect(props.type).toBe("application/ld+json");

    const data = JSON.parse(props.children);
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ranj Sidhu",
      url: "https://ranjsidhu.dev",
    });
    expect(data.sameAs).toEqual(
      expect.arrayContaining(["https://github.com/ranjsidhu"]),
    );
  });
});

describe("metadata", () => {
  it("sets the site URL and title template", () => {
    expect(metadata.metadataBase?.toString()).toBe("https://ranjsidhu.dev/");
    expect(metadata.title).toEqual({
      default: "Ranj Sidhu",
      template: "%s | Ranj Sidhu",
    });
  });

  it("allows indexing", () => {
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("configures the social preview image", () => {
    expect(metadata.openGraph).toMatchObject({
      url: "https://ranjsidhu.dev",
      images: [expect.objectContaining({ url: "/og.png" })],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: ["/og.png"],
    });
  });
});
