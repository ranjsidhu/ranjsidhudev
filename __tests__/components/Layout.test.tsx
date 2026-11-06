/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Layout from "@/components/Layout";

describe("Layout", () => {
  it("wraps its children in the page container", () => {
    render(
      <Layout>
        <p>Child content</p>
      </Layout>,
    );
    const container = screen.getByTestId("layout-container");
    expect(container).toContainElement(screen.getByText("Child content"));
    expect(container).toHaveClass("max-w-7xl", "mx-auto");
  });
});
