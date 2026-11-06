/**
 * @jest-environment jsdom
 */
import { render, screen, within } from "@testing-library/react";
import Footer from "@/components/Footer";
import { navLinks } from "@/constants";

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2031-06-15T12:00:00Z"));
  render(<Footer />);
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Footer", () => {
  it("renders the call to action linking to the contact page", () => {
    expect(
      screen.getByRole("heading", { name: "Ready to start a project?" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("links to every page in the navigation", () => {
    const pages = screen.getByText("Pages").parentElement as HTMLElement;
    for (const link of navLinks) {
      expect(
        within(pages).getByRole("link", { name: link.label }),
      ).toHaveAttribute("href", link.href);
    }
  });

  it("shows the contact email as a mailto link", () => {
    expect(
      screen.getByRole("link", { name: "ranj@ranjsidhu.dev" }),
    ).toHaveAttribute("href", "mailto:ranj@ranjsidhu.dev");
  });

  it("includes the social links", () => {
    for (const label of ["Instagram", "LinkedIn", "GitHub", "Email"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("shows the current year in the copyright", () => {
    expect(screen.getByText(/© 2031 Ranj Sidhu/)).toBeInTheDocument();
  });
});
