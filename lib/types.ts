export interface ImpactMetric {
  label: string;
  direction?: "up" | "down" | "neutral";
}

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  slug: string;
  date: string;
  published: boolean;
  order?: number;
  metrics: ImpactMetric[];
  coverImage?: string;
  coverAlt?: string;
  tags?: string[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}
