/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import FeaturedProject from "@/components/FeaturedProject";

describe("FeaturedProject", () => {
  beforeEach(() => {
    render(
      <FeaturedProject
        title="Stellar Recruitment"
        tagline="A recruitment platform"
        slug="/projects/stellar-recruitment"
        scaledText="01"
      />,
    );
  });

  it("renders the title, tagline and background text", () => {
    expect(
      screen.getByRole("heading", { name: "Stellar Recruitment" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A recruitment platform")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("links to the project", () => {
    expect(screen.getByRole("link", { name: "View Details" })).toHaveAttribute(
      "href",
      "/projects/stellar-recruitment",
    );
  });
});
