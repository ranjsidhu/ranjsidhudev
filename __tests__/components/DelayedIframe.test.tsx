/**
 * @jest-environment jsdom
 */
import { act, render, screen } from "@testing-library/react";
import { DelayedIframe } from "@/components/DelayedIframe";

const props = { src: "https://www.example.com/", title: "Example preview" };

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("DelayedIframe", () => {
  it("shows a loading placeholder before the delay", () => {
    render(<DelayedIframe {...props} />);
    expect(screen.getByText("Loading preview...")).toBeInTheDocument();
    expect(screen.queryByTitle("Example preview")).not.toBeInTheDocument();
  });

  it("renders the sandboxed iframe after the default 800ms delay", () => {
    render(<DelayedIframe {...props} />);
    act(() => jest.advanceTimersByTime(799));
    expect(screen.queryByTitle("Example preview")).not.toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1));
    const iframe = screen.getByTitle("Example preview");
    expect(iframe).toHaveAttribute("src", props.src);
    expect(iframe).toHaveAttribute("sandbox", "allow-same-origin");
    expect(iframe).toHaveAttribute("tabindex", "-1");
    expect(iframe).toHaveAttribute("loading", "lazy");
  });

  it("fades out the placeholder once the iframe shows", () => {
    render(<DelayedIframe {...props} />);
    const placeholder = screen
      .getByText("Loading preview...")
      .closest("div.absolute");
    expect(placeholder).toHaveClass("opacity-100");
    act(() => jest.advanceTimersByTime(800));
    expect(placeholder).toHaveClass("opacity-0", "pointer-events-none");
  });

  it("respects a custom delay", () => {
    render(<DelayedIframe {...props} delay={2000} />);
    act(() => jest.advanceTimersByTime(1999));
    expect(screen.queryByTitle("Example preview")).not.toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1));
    expect(screen.getByTitle("Example preview")).toBeInTheDocument();
  });

  it("clears its timer on unmount", () => {
    const clearSpy = jest.spyOn(global, "clearTimeout");
    const { unmount } = render(<DelayedIframe {...props} />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
