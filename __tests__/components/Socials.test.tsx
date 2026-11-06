/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Socials from "@/components/Socials";

describe("Socials", () => {
  beforeEach(() => {
    render(<Socials size={18} />);
  });

  it.each([
    ["Instagram", "https://www.instagram.com/ranjsidhu.dev/"],
    ["LinkedIn", "https://www.linkedin.com/in/ranjsidhu/"],
    ["GitHub", "https://github.com/ranjsidhu"],
  ])("opens %s in a new tab safely", (label, href) => {
    const link = screen.getByRole("link", { name: label });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links to the email address in the same tab", () => {
    const link = screen.getByRole("link", { name: "Email" });
    expect(link).toHaveAttribute("href", "mailto:ranj@ranjsidhu.dev");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders every icon at the requested size", () => {
    const icons = screen
      .getAllByRole("link")
      .map((link) => link.querySelector("svg"));
    expect(icons).toHaveLength(4);
    for (const icon of icons) {
      expect(icon).toHaveAttribute("height", "18");
      expect(icon).toHaveAttribute("width", "18");
    }
  });
});
