import type { ContactDetails } from "@/types";

const ENQUIRY_OPTIONS = [
  { value: "project", label: "Project Collaboration" },
  { value: "hiring", label: "Hiring Opportunity" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

const initialForm = {
  name: "",
  email: "",
  enquiryType: ENQUIRY_OPTIONS[0].value,
  message: "",
};

// reCAPTCHA v3 action name, checked on both client and server.
const RECAPTCHA_ACTION = "contact_form";

const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
};

const CONTACT_ERROR_MESSAGE =
  "Sorry, your message couldn't be sent right now. Please try again in a few minutes, or email me directly at ranj@ranjsidhu.dev.";

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isBoundedText = (value: unknown, max: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= max;

/**
 * Server-side validation of untrusted contact form input. Returns cleaned
 * details with the enquiry type mapped to its display label, or null when
 * the input is invalid.
 */
const parseContactDetails = (input: unknown): ContactDetails | null => {
  if (typeof input !== "object" || input === null) return null;
  const { name, email, enquiryType, message } = input as Record<
    string,
    unknown
  >;

  if (!isBoundedText(name, CONTACT_LIMITS.name)) return null;
  if (!isBoundedText(email, CONTACT_LIMITS.email)) return null;
  if (!isBoundedText(message, CONTACT_LIMITS.message)) return null;

  const trimmedEmail = email.trim();
  if (!validateEmail(trimmedEmail)) return null;

  const option = ENQUIRY_OPTIONS.find((o) => o.value === enquiryType);
  if (!option) return null;

  return {
    name: name.trim(),
    email: trimmedEmail,
    enquiryType: option.label,
    message: message.trim(),
  };
};

export {
  CONTACT_ERROR_MESSAGE,
  CONTACT_LIMITS,
  ENQUIRY_OPTIONS,
  initialForm,
  parseContactDetails,
  RECAPTCHA_ACTION,
  validateEmail,
};
