export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: "Academic" | "Creative" | "Fitness" | "Other";
  skillTags: string[];
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  availability: string;
  contact: string;
  image_url: string;
  user_id: string;
  created_at: string;
  location: string;
  rating?: number;
  tradePreferences?: string[];
}

export type ViewMode = "grid" | "list"; 