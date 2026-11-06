/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/app/(pages)/contact/Contact";
import { CONTACT_ERROR_MESSAGE, CONTACT_LIMITS } from "@/constants";

const mockSubmitContactForm = jest.fn();
jest.mock("@/app/(pages)/contact/serveractions", () => ({
  submitContactForm: (...args: unknown[]) => mockSubmitContactForm(...args),
}));

const mockGetRecaptchaToken = jest.fn();
jest.mock("@/lib/recaptchaClient", () => ({
  RECAPTCHA_SITE_KEY: "test-site-key",
  getRecaptchaToken: (...args: unknown[]) => mockGetRecaptchaToken(...args),
}));

const mockToastError = jest.fn();
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { error: (...args: unknown[]) => mockToastError(...args) },
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => (
    <script data-testid="recaptcha-script" data-src={src} />
  ),
}));

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  overrides: Partial<Record<"name" | "email" | "message", string>> = {},
) => {
  await user.type(screen.getByLabelText("Name"), overrides.name ?? "Alice");
  await user.type(
    screen.getByLabelText("Email"),
    overrides.email ?? "alice@example.com",
  );
  await user.type(
    screen.getByLabelText("Message"),
    overrides.message ?? "Hello there",
  );
};

const submit = (user: ReturnType<typeof userEvent.setup>) =>
  user.click(screen.getByRole("button", { name: /send message/i }));

beforeEach(() => {
  mockGetRecaptchaToken.mockResolvedValue("recaptcha-token");
  mockSubmitContactForm.mockResolvedValue({ success: true });
});

describe("Contact form", () => {
  it("loads the reCAPTCHA script with the site key", () => {
    render(<Contact />);
    expect(screen.getByTestId("recaptcha-script")).toHaveAttribute(
      "data-src",
      "https://www.google.com/recaptcha/api.js?render=test-site-key",
    );
  });

  it("limits field lengths to match the server", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Name")).toHaveAttribute(
      "maxLength",
      String(CONTACT_LIMITS.name),
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "maxLength",
      String(CONTACT_LIMITS.email),
    );
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "maxLength",
      String(CONTACT_LIMITS.message),
    );
  });

  it("submits the form with a reCAPTCHA token and shows the success state", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await submit(user);

    expect(mockGetRecaptchaToken).toHaveBeenCalledWith("contact_form");
    expect(mockSubmitContactForm).toHaveBeenCalledWith(
      {
        name: "Alice",
        email: "alice@example.com",
        enquiryType: "project",
        message: "Hello there",
      },
      "recaptcha-token",
    );
    expect(
      await screen.findByRole("heading", { name: "Message sent!" }),
    ).toBeInTheDocument();
    expect(mockToastError).not.toHaveBeenCalled();
  });

  it("sends the selected enquiry option's value", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await user.selectOptions(
      screen.getByLabelText("What's this about?"),
      "Hiring Opportunity",
    );
    await submit(user);

    expect(mockSubmitContactForm.mock.calls[0][0].enquiryType).toBe("hiring");
  });

  it("blocks an invalid email address before submitting", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user, { email: "not-an-email" });
    await submit(user);

    expect(mockToastError).toHaveBeenCalledWith(
      "Please enter a valid email address.",
    );
    expect(mockSubmitContactForm).not.toHaveBeenCalled();
  });

  it("shows a friendly error and keeps the message when the server fails", async () => {
    mockSubmitContactForm.mockResolvedValue({ success: false });
    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await submit(user);

    expect(mockToastError).toHaveBeenCalledWith(CONTACT_ERROR_MESSAGE);
    expect(screen.queryByText("Message sent!")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toHaveValue("Hello there");
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).not.toBeDisabled();
  });

  it("shows the same friendly error when reCAPTCHA is unavailable", async () => {
    mockGetRecaptchaToken.mockRejectedValue(new Error("not loaded"));
    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await submit(user);

    expect(mockSubmitContactForm).not.toHaveBeenCalled();
    expect(mockToastError).toHaveBeenCalledWith(CONTACT_ERROR_MESSAGE);
  });

  it("shows the friendly error when the request itself throws", async () => {
    mockSubmitContactForm.mockRejectedValue(new Error("network error"));
    const user = userEvent.setup();
    render(<Contact />);
    await fillForm(user);
    await submit(user);

    expect(mockToastError).toHaveBeenCalledWith(CONTACT_ERROR_MESSAGE);
    expect(mockToastError).not.toHaveBeenCalledWith(
      expect.stringContaining("network error"),
    );
  });
});
