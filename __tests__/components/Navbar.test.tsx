/**
 * @jest-environment jsdom
 */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { navLinks } from "@/constants";

const mockPathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

const nav = () => screen.getByRole("navigation", { name: "Main navigation" });
const menuButton = () => screen.getByRole("button", { name: "Open main menu" });
const mobileMenu = () => document.getElementById("mobile-menu") as HTMLElement;

const scrollTo = (y: number) => {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
};

beforeEach(() => {
  mockPathname.mockReturnValue("/");
  scrollTo(0);
});

describe("Navbar", () => {
  it("renders the logo linking home", () => {
    render(<Navbar />);
    expect(screen.getByAltText("Logo").closest("a")).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders each nav link in both the desktop and mobile menus", () => {
    render(<Navbar />);
    for (const link of navLinks) {
      const matches = screen.getAllByRole("link", { name: link.label });
      expect(matches).toHaveLength(2);
      for (const match of matches) {
        expect(match).toHaveAttribute("href", link.href);
      }
    }
    expect(screen.getAllByRole("link", { name: /hire me/i })).toHaveLength(2);
  });

  it("marks only the current page as active", () => {
    mockPathname.mockReturnValue("/projects");
    render(<Navbar />);

    for (const link of screen.getAllByRole("link", { name: "Projects" })) {
      expect(link).toHaveAttribute("aria-current", "page");
    }
    for (const link of screen.getAllByRole("link", { name: "About" })) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });

  it("starts transparent and turns solid after scrolling past 20px", () => {
    render(<Navbar />);
    expect(nav()).toHaveClass("bg-transparent");

    scrollTo(21);
    expect(nav()).toHaveClass("backdrop-blur-2xl");
    expect(nav()).not.toHaveClass("bg-transparent");

    scrollTo(20);
    expect(nav()).toHaveClass("bg-transparent");
  });

  it("removes the scroll listener on unmount", () => {
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<Navbar />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(mobileMenu()).toHaveClass("max-h-0");

    await user.click(menuButton());
    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
    expect(mobileMenu()).toHaveClass("max-h-80");

    await user.click(menuButton());
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
  });

  it.each([
    ["a page link", "About"],
    ["the hire me link", /hire me/i],
  ])("closes the mobile menu when %s is clicked", async (_label, name) => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(menuButton());

    const mobileLink = screen
      .getAllByRole("link", { name })
      .find((link) => mobileMenu().contains(link)) as HTMLElement;
    mobileLink.addEventListener("click", (e) => e.preventDefault());
    await user.click(mobileLink);

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(mobileMenu()).toHaveClass("max-h-0");
  });
});
