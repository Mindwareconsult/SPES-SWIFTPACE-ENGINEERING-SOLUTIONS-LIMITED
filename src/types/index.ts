export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  location?: string;
  client?: string;
  project_status: string;
  completion_date?: string;
  short_description: string;
  overview?: string;
  objectives?: string;
  scope_of_work?: string;
  technical_approach?: string;
  project_outcome?: string;
  cover_image: string;
  featured: number;
  publication_status: 'published' | 'draft';
  seo_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_path: string;
  image_caption?: string;
  display_order: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category_id?: number;
  category_name: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  publication_status: 'published' | 'draft';
  published_at: string;
  seo_title?: string;
  meta_description?: string;
  created_at: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  post_count?: number;
}

export interface Enquiry {
  id: number;
  full_name: string;
  company_name?: string;
  email: string;
  phone: string;
  service_required: string;
  project_type: string;
  project_location: string;
  estimated_budget?: string;
  preferred_contact_method: string;
  project_description: string;
  attachment_path?: string;
  privacy_consent: number;
  enquiry_status: 'New' | 'Contacted' | 'In Discussion' | 'Quoted' | 'Converted' | 'Closed';
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: number;
  filename: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  category: string;
  uploaded_at: string;
}

export interface WebsiteSettings {
  company_name: string;
  rc_number: string;
  email: string;
  phone_primary: string;
  phone_secondary: string;
  whatsapp_primary: string;
  whatsapp_secondary: string;
  address_line1: string;
  address_city: string;
  address_state: string;
  address_country: string;
  hero_headline?: string;
  hero_subtitle?: string;
  contact_notice?: string;
  [key: string]: string | undefined;
}

export interface ServiceDetailItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  heroImage: string;
  relatedCategory?: string;
  galleryImages?: { src: string; alt: string }[];
  detailedOverview: string;
  capabilities: string[];
  clientBenefits: { title: string; desc: string }[];
  processStages: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  iconName: string;
}
