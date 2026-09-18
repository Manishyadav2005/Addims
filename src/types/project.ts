export type ProjectType =
  | 'Client Project'
  | 'ADDIMS Product'
  | 'Business System'
  | 'Website'
  | 'AI Solution'
  | 'Custom Software';

export type ProjectCategory =
  | 'Business Management'
  | 'Healthcare'
  | 'Hotel Management'
  | 'Restaurant & Billing'
  | 'AI & Automation'
  | 'Web & Digital'
  | 'Custom Software';

export type ProjectPrivacy = 'Public' | 'Private';

export type ProjectStatus = 'Draft' | 'Published';

export interface Project {
  id: string;
  name: string;
  slug: string;
  shortTitle: string;
  projectType: ProjectType;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;

  clientName?: string;
  clientIndustry?: string;
  visibility: ProjectPrivacy;

  coverImage: string;
  galleryImages: string[];

  features: string[];
  technologies: string[];

  liveUrl?: string;
  demoUrl?: string;
  githubUrl?: string;

  status: ProjectStatus;
  featured: boolean;
  displayOrder: number;

  createdAt: string;
  updatedAt: string;
}
