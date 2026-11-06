/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it("shows the 404 message", () => {
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("links home and to the projects page", () => {
    expect(screen.getByRole("link", { name: /go home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("link", { name: /view projects/i }),
    ).toHaveAttribute("href", "/projects");
  });
});
