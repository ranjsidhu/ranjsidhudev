import {
  CONTACT_LIMITS,
  ENQUIRY_OPTIONS,
  initialForm,
  parseContactDetails,
  validateEmail,
} from "@/constants";

const valid = {
  name: "Alice",
  email: "alice@example.com",
  enquiryType: "hiring",
  message: "Hello",
};

describe("validateEmail", () => {
  it.each(["alice@example.com", "a.b+c@sub.example.co.uk", "x_y%z@d-e.io"])(
    "accepts %s",
    (email) => {
      expect(validateEmail(email)).toBe(true);
    },
  );

  it.each([
    "",
    "plainaddress",
    "@example.com",
    "alice@",
    "alice@example",
    "alice@example.c",
    "alice @example.com",
    "<b>@example.com",
  ])("rejects %p", (email) => {
    expect(validateEmail(email)).toBe(false);
  });
});

describe("initialForm", () => {
  it("defaults the enquiry type to the first option's value", () => {
    expect(initialForm.enquiryType).toBe(ENQUIRY_OPTIONS[0].value);
  });
});

describe("parseContactDetails", () => {
  it("returns trimmed details with the enquiry label", () => {
    expect(
      parseContactDetails({
        name: "  Alice ",
        email: " alice@example.com ",
        enquiryType: "hiring",
        message: "  Hello  ",
      }),
    ).toEqual({
      name: "Alice",
      email: "alice@example.com",
      enquiryType: "Hiring Opportunity",
      message: "Hello",
    });
  });

  it.each(ENQUIRY_OPTIONS)("maps enquiry value $value to $label", (option) => {
    expect(
      parseContactDetails({ ...valid, enquiryType: option.value })?.enquiryType,
    ).toBe(option.label);
  });

  it.each([
    ["null", null],
    ["a string", "hello"],
    ["an empty object", {}],
    ["a non-string name", { ...valid, name: 42 }],
    ["a blank name", { ...valid, name: "   " }],
    ["a missing email", { ...valid, email: undefined }],
    ["an invalid email", { ...valid, email: "not-an-email" }],
    ["markup in the email", { ...valid, email: '"><img src=x>@a.co' }],
    ["an unknown enquiry type", { ...valid, enquiryType: "spam" }],
    [
      "an enquiry label instead of value",
      { ...valid, enquiryType: "Feedback" },
    ],
    ["a blank message", { ...valid, message: "\n\t " }],
    ["an array message", { ...valid, message: ["a"] }],
  ])("rejects %s", (_label, input) => {
    expect(parseContactDetails(input)).toBeNull();
  });

  it.each([
    ["name", CONTACT_LIMITS.name],
    ["message", CONTACT_LIMITS.message],
  ] as const)("enforces the %s length limit", (field, max) => {
    expect(
      parseContactDetails({ ...valid, [field]: "a".repeat(max) }),
    ).not.toBeNull();
    expect(
      parseContactDetails({ ...valid, [field]: "a".repeat(max + 1) }),
    ).toBeNull();
  });

  it("enforces the email length limit", () => {
    const local = "a".repeat(CONTACT_LIMITS.email - "@example.com".length);
    expect(
      parseContactDetails({ ...valid, email: `${local}@example.com` }),
    ).not.toBeNull();
    expect(
      parseContactDetails({ ...valid, email: `${local}a@example.com` }),
    ).toBeNull();
  });
});
