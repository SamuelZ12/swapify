"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle, Pencil, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostItemForm } from "@/components/post-item-form";
import { Separator } from "@/components/ui/separator";

type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  category: "Electronics" | "Books" | "Clothing" | "Furniture" | "Sports" | "Vehicles" | "Other";
  condition: "New" | "Like New" | "Good" | "Fair";
  location: string;
  contact: string;
  image_url: string;
  user_id: string;
  created_at: string;
};

export function MarketplaceItemsGrid() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchItems();
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
    }
  }

  async function fetchItems() {
    const { data, error } = await supabase
      .from("marketplace_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="text-center">Loading items...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Available Items</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Post Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post a New Item</DialogTitle>
              <DialogDescription>
                Add details about the item you want to trade
              </DialogDescription>
            </DialogHeader>
            <PostItemForm onSuccess={fetchItems} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">
            No items available for trade yet. Be the first to post one!
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-lg border bg-card overflow-hidden group"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image_url || "/item-placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {item.user_id === currentUserId && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Item</DialogTitle>
                        <DialogDescription>
                          Make changes to your item listing
                        </DialogDescription>
                      </DialogHeader>
                      <PostItemForm onSuccess={fetchItems} initialData={item} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{item.condition}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{item.location}</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full mt-4" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Trader
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Contact Information</DialogTitle>
                      <DialogDescription>
                        Get in touch about "{item.title}"
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Location</p>
                            <p className="text-sm text-muted-foreground">{item.location}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start space-x-4">
                          <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Contact Details</p>
                            <p className="text-sm text-muted-foreground">{item.contact}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          When contacting the trader, please mention that you found their item on our marketplace. Be respectful and trade safely.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 