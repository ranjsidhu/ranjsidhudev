/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Project from "@/components/Project";

const props = {
  slug: "stellar-recruitment",
  title: "Stellar Recruitment",
  summary: "A recruitment system",
  tech: ["Next.js", "PostgreSQL"],
  url: "https://www.stellar-recruitment.co.uk/",
};

describe("Project", () => {
  beforeEach(() => {
    render(<Project {...props} />);
  });

  it("renders the title and summary", () => {
    expect(screen.getByTestId("project-slug-link")).toHaveTextContent(
      "Stellar Recruitment",
    );
    expect(screen.getByTestId("project-summary")).toHaveTextContent(
      "A recruitment system",
    );
  });

  it("links the title and the details button to the project page", () => {
    expect(screen.getByTestId("project-slug-link")).toHaveAttribute(
      "href",
      "/projects/stellar-recruitment",
    );
    expect(screen.getByTestId("project-link")).toHaveAttribute(
      "href",
      "/projects/stellar-recruitment",
    );
  });

  it("renders a tag for each technology", () => {
    const tags = screen.getAllByTestId("tech-tag-container");
    expect(tags.map((t) => t.textContent)).toEqual(["Next.js", "PostgreSQL"]);
  });
});
