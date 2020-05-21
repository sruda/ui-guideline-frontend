// TODO: Mover este Types a un interface más global, ya que aqui esta atado al componente.
import { Types as FaceRatingTypes } from '@atoms/Ratings/FaceRating/FaceRating';

// TODO: Investigar más ya que Evergreen dice ser un Design System y a la vez un UI Framework
export enum TypeOfSystem {
  designSystem = 'ds',
  frameworkAndLibrary = 'fl',
}

export enum RefSystemSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface RefSystemData {
  id?: string;
  active?: boolean;
  name: string;
  company: string;
  type: TypeOfSystem;
  quantity_of_components: number;
  size: RefSystemSize;
  description: string;
  company_site_url: string;
  system_site_url: string;
  logo_url: string;
  updated: boolean;
  coming_soon: boolean;
  created_at?: Date;
}

export interface SiblingRefSystemData {
  name: string;
  logo_url: string;
  component_site_url: string;
}

export interface SiblingComponentData {
  id?: string;
  name: string;
  ref_systems: {
    [key: string]: Array<SiblingRefSystemData>;
  };
}

export interface ComponentData {
  id?: string;
  active?: boolean;
  name: string;
  description: string;
  keywords: Array<string>;
  siblings: Array<SiblingComponentData>;
  is_verified: boolean;
  thumbnail_url: string;
  visual_ref_urls: Array<string>;
  created_at?: Date;
}

export interface SuggestionData {
  id: string;
  search_terms: string;
  details: string;
  img_url: string;
  created_at: Date;
}

export interface RatingData {
  id: string;
  rate: FaceRatingTypes;
  comment: string;
  created_at: Date;
}
