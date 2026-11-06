import {
  AnimateOnScroll,
  ComingSoonPage,
  DelayedIframe,
  FeaturedProject,
  Footer,
  HeroScene,
  Layout,
  Navbar,
  Project,
  ProjectDetails,
  ProjectRow,
  Socials,
  TechTag,
} from "@/components";

describe("components barrel", () => {
  it.each(
    Object.entries({
      AnimateOnScroll,
      ComingSoonPage,
      DelayedIframe,
      FeaturedProject,
      Footer,
      HeroScene,
      Layout,
      Navbar,
      Project,
      ProjectDetails,
      ProjectRow,
      Socials,
      TechTag,
    }),
  )("exports %s as a component", (_name, component) => {
    expect(typeof component).toBe("function");
  });
});
