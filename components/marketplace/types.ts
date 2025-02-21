export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  category: "Item" | "Skill" | "Other";
  condition?: "New" | "Like New" | "Good" | "Fair";
  location?: string;
  contact: string;
  image_url: string;
  user_id: string;
  created_at: string;
}

export type ViewMode = "grid" | "list"; 