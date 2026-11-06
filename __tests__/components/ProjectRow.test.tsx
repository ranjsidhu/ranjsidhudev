/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import ProjectRow from "@/components/ProjectRow";

const props = {
  number: "01",
  title: "Tutoring To Success",
  tagline: "A tutoring agency website",
  slug: "tutoring-to-success",
};

describe("ProjectRow", () => {
  it("links to the project page and shows its details", () => {
    render(<ProjectRow {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/tutoring-to-success");
    expect(link).toHaveTextContent("01");
    expect(
      screen.getByRole("heading", { name: "Tutoring To Success" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A tutoring agency website")).toBeInTheDocument();
  });

  it("renders a tag for each technology", () => {
    render(<ProjectRow {...props} tech={["Next.js", "Express"]} />);
    expect(
      screen.getAllByTestId("tech-tag-container").map((t) => t.textContent),
    ).toEqual(["Next.js", "Express"]);
  });

  it.each([
    ["undefined", undefined],
    ["empty", []],
  ])("renders no tags when tech is %s", (_label, tech) => {
    render(<ProjectRow {...props} tech={tech} />);
    expect(screen.queryByTestId("tech-tag-container")).not.toBeInTheDocument();
  });
});
