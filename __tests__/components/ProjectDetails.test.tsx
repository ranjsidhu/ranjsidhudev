/**
 * @jest-environment jsdom
 */
import { render, screen, within } from "@testing-library/react";
import ProjectDetails from "@/components/ProjectDetails";

const props = {
  title: "Stellar Recruitment",
  tagline: "Recruitment, simplified",
  description: "A full recruitment system.",
  benefits: ["Admin dashboards", "Role-based access", "Fast pages"],
  work: "I designed and built the platform.",
  url: "https://www.stellar-recruitment.co.uk/",
};

describe("ProjectDetails", () => {
  beforeEach(() => {
    render(<ProjectDetails {...props} />);
  });

  it("renders the title, tagline, description and role", () => {
    expect(screen.getByTestId("project-details-title")).toHaveTextContent(
      props.title,
    );
    expect(screen.getByTestId("project-details-tagline")).toHaveTextContent(
      props.tagline,
    );
    expect(
      screen.getByTestId("project-details-delivered-desc"),
    ).toHaveTextContent(props.description);
    expect(screen.getByTestId("project-details-role-desc")).toHaveTextContent(
      props.work,
    );
  });

  it("opens the live site in a new tab safely", () => {
    const link = screen.getByTestId("project-details-visit-link");
    expect(link).toHaveAttribute("href", props.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("lists every benefit", () => {
    const list = screen.getByTestId("project-details-benefits-list");
    for (const benefit of props.benefits) {
      expect(within(list).getByText(benefit)).toBeInTheDocument();
    }
    expect(list.children).toHaveLength(props.benefits.length);
  });

  it("links back to all projects", () => {
    expect(
      screen.getByRole("link", { name: /back to all projects/i }),
    ).toHaveAttribute("href", "/projects");
  });
});
