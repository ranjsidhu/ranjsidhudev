import { escapeHtml, formatEmail } from "@/app/api/contact/emailtemplate";
import type { ContactDetails } from "@/types";

const details: ContactDetails = {
  name: "Alice",
  email: "alice@example.com",
  enquiryType: "Feedback",
  message: "Hello there",
};

describe("escapeHtml", () => {
  it.each([
    ["&", "&amp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ['"', "&quot;"],
    ["'", "&#39;"],
  ])("escapes %s", (input, expected) => {
    expect(escapeHtml(input)).toBe(expected);
  });

  it("escapes every special character in a mixed string", () => {
    expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
      "&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;",
    );
  });

  it("leaves plain text unchanged", () => {
    expect(escapeHtml("Plain text 123")).toBe("Plain text 123");
  });
});

describe("formatEmail", () => {
  it("includes each contact field and the subject", () => {
    const html = formatEmail(details, "New Contact Form Submission");
    expect(html).toContain("Alice");
    expect(html).toContain("alice@example.com");
    expect(html).toContain("Feedback");
    expect(html).toContain("Hello there");
    expect(html).toContain("New Contact Form Submission");
  });

  it("renders injected markup in every field as text, not HTML", () => {
    const html = formatEmail(
      {
        name: '</span><a href="https://attacker.example">x</a>',
        email: '"><img src="https://attacker.example/p.gif">',
        enquiryType: "<b>INJECTED</b>",
        message: '<form action="https://attacker.example">',
      },
      "<script>alert(1)</script>",
    );

    for (const fragment of [
      "<a href",
      "<img",
      "<b>INJECTED",
      "<form",
      "<script>",
      "</span><a",
    ]) {
      expect(html).not.toContain(fragment);
    }
    expect(html).toContain("&lt;a href=&quot;https://attacker.example&quot;");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("converts LF and CRLF newlines in the message to <br>", () => {
    const html = formatEmail(
      { ...details, message: "line 1\nline 2\r\nline 3" },
      "Subject",
    );
    expect(html).toContain("line 1<br>line 2<br>line 3");
  });

  it("escapes a literal <br> typed by the visitor", () => {
    const html = formatEmail({ ...details, message: "a<br>b" }, "Subject");
    expect(html).toContain("a&lt;br&gt;b");
  });
});
