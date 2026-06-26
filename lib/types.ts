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
  headerImage?: string;
  headerAlt?: string;
  tags?: string[];
  passwordProtected?: boolean;
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

export interface RoleLine {
  prefix: string;
  company: string;
  href: string;
}

export interface LabScreenshot {
  src?: string;
  alt?: string;
}

export interface LabExperiment {
  title: string;
  description: string;
  slug: string;
  published: boolean;
  order?: number;
  date?: string;
  coverImage?: string;
  coverAlt?: string;
  iconImage?: string;
  iconAlt?: string;
  iconBg?: string;
  badge?: string;
  badgePosition?: "left" | "right";
  downloadUrl?: string;
  githubUrl?: string;
  summary?: string;
  screenshots?: LabScreenshot[];
  tags?: string[];
}

export interface Lab extends LabExperiment {
  content: string;
}
