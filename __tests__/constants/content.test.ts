import { homepageSkills, navLinks, PROJECTS } from "@/constants";

describe("PROJECTS", () => {
  it("has unique slugs", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(PROJECTS)("$slug has complete, well-formed content", (project) => {
    expect(project.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(project.title.trim()).not.toBe("");
    expect(project.summary.trim()).not.toBe("");
    expect(project.tech.length).toBeGreaterThan(0);
    expect(project.highlights.length).toBeGreaterThan(0);
    expect(new URL(project.url).protocol).toBe("https:");
  });
});

describe("homepageSkills", () => {
  it("lists unique, non-empty skills", () => {
    expect(homepageSkills.length).toBeGreaterThan(0);
    expect(new Set(homepageSkills).size).toBe(homepageSkills.length);
    for (const skill of homepageSkills) expect(skill.trim()).not.toBe("");
  });
});

describe("navLinks", () => {
  it("starts with the home page and uses unique paths", () => {
    expect(navLinks[0]).toEqual({ href: "/", label: "Home" });
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href.startsWith("/")).toBe(true);
  });
});
