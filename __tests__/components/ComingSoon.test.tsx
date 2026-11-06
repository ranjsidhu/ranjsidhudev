/**
 * @jest-environment jsdom
 */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComingSoonPage from "@/components/ComingSoon";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const firstLine = (container: HTMLElement) =>
  container.querySelector(".h-px.bg-white\\/5") as HTMLElement;

describe("ComingSoonPage", () => {
  it("renders the heading, status and logo", () => {
    render(<ComingSoonPage />);
    expect(
      screen.getByRole("heading", { name: "Coming Soon" }),
    ).toBeInTheDocument();
    expect(screen.getByText("In Development")).toBeInTheDocument();
    expect(screen.getByAltText("Ranj Sidhu")).toBeInTheDocument();
  });

  it("fades the content in after mounting", () => {
    render(<ComingSoonPage />);
    const content = screen
      .getByRole("heading", { name: "Coming Soon" })
      .closest(".transition-all");
    expect(content).toHaveClass("opacity-100");
    expect(content).not.toHaveClass("opacity-0");
  });

  it("renders the animated grid lines", () => {
    const { container } = render(<ComingSoonPage />);
    expect(container.querySelectorAll(".h-px.bg-white\\/5")).toHaveLength(10);
    expect(container.querySelectorAll(".w-px.bg-white\\/5")).toHaveLength(10);
  });

  it("moves the lines every second", () => {
    const { container } = render(<ComingSoonPage />);
    const before = firstLine(container).style.transform;
    act(() => jest.advanceTimersByTime(1000));
    expect(firstLine(container).style.transform).not.toBe(before);
  });

  it("wraps the animation counter after 60 seconds", () => {
    const { container } = render(<ComingSoonPage />);
    const atZero = firstLine(container).style.transform;
    act(() => jest.advanceTimersByTime(60_000));
    expect(firstLine(container).style.transform).toBe(atZero);
  });

  it("navigates to the contact page from the button", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ComingSoonPage />);
    await user.click(screen.getByRole("button", { name: "Get in touch" }));
    expect(mockPush).toHaveBeenCalledWith("/contact");
  });

  it("stops the interval on unmount", () => {
    const clearSpy = jest.spyOn(global, "clearInterval");
    const { unmount } = render(<ComingSoonPage />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
