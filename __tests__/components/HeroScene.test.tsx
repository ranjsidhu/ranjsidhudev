/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import HeroScene from "@/components/HeroScene";

const renderHero = () => {
  const view = render(<HeroScene />);
  const section = view.container.querySelector("section") as HTMLElement;
  return { ...view, section };
};

const glow = (section: HTMLElement) =>
  section.querySelector(".transition-opacity") as HTMLElement;

describe("HeroScene", () => {
  it("renders the headline and availability badge", () => {
    renderHero();
    expect(
      screen.getByRole("heading", { name: /i build digital experiences/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Available for new projects")).toBeInTheDocument();
  });

  it("links to the projects and contact pages", () => {
    renderHero();
    expect(screen.getByRole("link", { name: /see my work/i })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: /let's talk/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders the stats cards", () => {
    renderHero();
    for (const label of [
      "Years Experience",
      "Projects Delivered",
      "Client Satisfaction",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("generates 30 particles after mounting", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    const { section } = renderHero();
    const particles = section.querySelectorAll(".particle");
    expect(particles).toHaveLength(30);
    expect((particles[0] as HTMLElement).style.left).toBe("50%");
    expect(particles[0]).toHaveClass("particle-violet");
    expect(particles[1]).toHaveClass("particle-cyan");
    expect(particles[2]).toHaveClass("particle-rose");
  });

  it("centres the glow until the mouse moves", () => {
    const { section } = renderHero();
    expect(glow(section).style.background).toContain("50% 50%");
  });

  it("moves the glow to follow the mouse", () => {
    const { section } = renderHero();
    jest.spyOn(section, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 50,
      width: 400,
      height: 200,
    } as DOMRect);

    fireEvent.mouseMove(section, { clientX: 200, clientY: 100 });
    expect(glow(section).style.background).toContain("25% 25%");
  });

  it("removes the mousemove listener on unmount", () => {
    const { section, unmount } = renderHero();
    const removeSpy = jest.spyOn(section, "removeEventListener");
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
