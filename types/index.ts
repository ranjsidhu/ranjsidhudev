type ContactDetails = Readonly<{
  name: string;
  email: string;
  enquiryType: string;
  message: string;
}>;

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

type TechTagProps = Readonly<{
  name: string;
}>;

type ProjectProps = Readonly<{
  slug: string;
  title: string;
  summary: string;
  tech: string[];
}>;

type ProjectDetailsProps = Readonly<{
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  work: string;
  url: string;
}>;

type FeaturedProjectProps = Readonly<{
  title: string;
  tagline: string;
  slug: string;
  scaledText: string;
}>;

type SocialProps = Readonly<{
  size: number;
}>;

export type {
  ContactDetails,
  LayoutProps,
  TechTagProps,
  ProjectProps,
  ProjectDetailsProps,
  FeaturedProjectProps,
  SocialProps,
};
