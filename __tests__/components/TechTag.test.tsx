/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import TechTag from "@/components/TechTag";

describe("TechTag", () => {
  it("renders the technology name", () => {
    render(<TechTag name="Next.js" />);
    expect(screen.getByTestId("tech-tag-container")).toHaveTextContent(
      "Next.js",
    );
  });
});
