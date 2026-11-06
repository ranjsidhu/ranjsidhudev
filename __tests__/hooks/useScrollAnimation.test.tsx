/**
 * @jest-environment jsdom
 */
import { act, render, screen } from "@testing-library/react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

const observers: MockIntersectionObserver[] = [];

class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor(
    public callback: ObserverCallback,
    public options: IntersectionObserverInit,
  ) {
    observers.push(this);
  }
  trigger(target: Element, isIntersecting: boolean) {
    act(() => this.callback([{ target, isIntersecting }]));
  }
}

beforeAll(() => {
  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

beforeEach(() => {
  observers.length = 0;
});

function Probe({ threshold }: { threshold?: number }) {
  const ref = useScrollAnimation(threshold);
  return <div ref={ref} data-testid="probe" />;
}

function Detached() {
  useScrollAnimation();
  return null;
}

describe("useScrollAnimation", () => {
  it("observes the element with the default threshold", () => {
    render(<Probe />);
    expect(observers).toHaveLength(1);
    expect(observers[0].options).toEqual({
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    });
    expect(observers[0].observe).toHaveBeenCalledWith(
      screen.getByTestId("probe"),
    );
  });

  it("passes a custom threshold to the observer", () => {
    render(<Probe threshold={0.5} />);
    expect(observers[0].options.threshold).toBe(0.5);
  });

  it("marks the element visible and stops observing once it intersects", () => {
    render(<Probe />);
    const el = screen.getByTestId("probe");
    observers[0].trigger(el, true);
    expect(el).toHaveClass("is-visible");
    expect(observers[0].unobserve).toHaveBeenCalledWith(el);
  });

  it("does nothing while the element is off screen", () => {
    render(<Probe />);
    const el = screen.getByTestId("probe");
    observers[0].trigger(el, false);
    expect(el).not.toHaveClass("is-visible");
    expect(observers[0].unobserve).not.toHaveBeenCalled();
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(<Probe />);
    unmount();
    expect(observers[0].disconnect).toHaveBeenCalled();
  });

  it("does not observe when the ref is not attached", () => {
    render(<Detached />);
    expect(observers).toHaveLength(0);
  });
});

describe("AnimateOnScroll", () => {
  it("renders children with the default animation and no delay", () => {
    render(
      <AnimateOnScroll>
        <p>Animated</p>
      </AnimateOnScroll>,
    );
    const wrapper = screen.getByText("Animated").parentElement as HTMLElement;
    expect(wrapper).toHaveClass("animate-on-scroll", "anim-fade-in-up");
    expect(wrapper).not.toHaveAttribute("style");
  });

  it("applies the chosen animation, extra classes and delay", () => {
    render(
      <AnimateOnScroll animation="slide-in-left" delay={3} className="extra">
        <p>Animated</p>
      </AnimateOnScroll>,
    );
    const wrapper = screen.getByText("Animated").parentElement as HTMLElement;
    expect(wrapper).toHaveClass("anim-slide-in-left", "extra");
    expect(wrapper.style.animationDelay).toBe(`${3 * 0.1}s`);
  });

  it("becomes visible when scrolled into view", () => {
    render(
      <AnimateOnScroll>
        <p>Animated</p>
      </AnimateOnScroll>,
    );
    const wrapper = screen.getByText("Animated").parentElement as HTMLElement;
    observers[0].trigger(wrapper, true);
    expect(wrapper).toHaveClass("is-visible");
  });
});
