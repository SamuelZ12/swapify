"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MessageCircle, Pencil, Mail, MapPin, Clock, Trash2, Search, Star } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostItemForm } from "@/components/forms/post-item-form";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MarketplaceItem } from "./types";

export function MarketplaceItemsGrid() {
  const [trades, setTrades] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<MarketplaceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [skillLevelFilter, setSkillLevelFilter] = useState<string>("all");
  const supabase = createClient();

  useEffect(() => {
    fetchTrades();
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
    }
  }

  async function fetchTrades() {
    const { data, error } = await supabase
      .from("marketplace_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching trades:", error);
    } else {
      setTrades(data || []);
    }
    setLoading(false);
  }

  async function deleteTrade(id: string) {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .delete()
        .match({ id });

      if (error) {
        console.error("Error deleting trade:", error);
        alert("Error deleting trade. Please try again.");
      } else {
        fetchTrades();
      }
    } catch (error: any) {
      console.error("Error deleting trade:", error);
      alert("Error deleting trade. Please try again.");
    }
  }

  const filteredTrades = trades.filter((trade) => {
    const matchesSearch = 
      trade.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trade.skillTags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (trade.tradePreferences || []).some(pref => pref.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || trade.category === categoryFilter;
    const matchesSkillLevel = skillLevelFilter === "all" || trade.skillLevel === skillLevelFilter;

    return matchesSearch && matchesCategory && matchesSkillLevel;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading trades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Available Trades</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Post Trade
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Post a New Trade</DialogTitle>
                <DialogDescription>
                  Share your skills and what you'd like to learn in exchange
                </DialogDescription>
              </DialogHeader>
              <PostItemForm onSuccess={fetchTrades} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by skill, title, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={skillLevelFilter} onValueChange={setSkillLevelFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Skill Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTrades.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="max-w-sm mx-auto space-y-4">
              <p className="text-lg font-medium">No trades available</p>
              <p className="text-muted-foreground">
                {searchQuery || categoryFilter !== "all" || skillLevelFilter !== "all"
                  ? "Try adjusting your search filters"
                  : "Be the first to post a trade!"}
              </p>
            </div>
          </div>
        ) : (
          filteredTrades.map((trade) => (
            <div
              key={trade.id}
              className="flex flex-col rounded-xl border bg-card overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={trade.image_url || "/item-placeholder.jpg"}
                  alt={trade.title}
                  fill
                  className="object-cover"
                />
                {trade.user_id === currentUserId && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedTrade(trade)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Trade</DialogTitle>
                          <DialogDescription>
                            Update your trade listing
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <PostItemForm onSuccess={fetchTrades} initialData={trade} />
                          <Button
                            variant="destructive"
                            className="w-full mt-2"
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this trade? This action cannot be undone.")) {
                                deleteTrade(trade.id);
                              }
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Trade
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      {trade.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      {trade.skillLevel}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4 flex-1">
                <div>
                  <h3 className="font-semibold text-lg truncate">{trade.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {trade.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {(trade.skillTags || []).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {(trade.tradePreferences || []).length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Looking for:</p>
                      <div className="flex flex-wrap gap-1">
                        {(trade.tradePreferences || []).map((pref) => (
                          <Badge key={pref} variant="secondary" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{trade.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{trade.availability}</span>
                    </div>
                    {trade.rating !== undefined && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>{trade.rating} / 5</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Trader
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Contact Information</DialogTitle>
                      <DialogDescription>
                        Get in touch about "{trade.title}"
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Contact Details</p>
                            <p className="text-sm text-muted-foreground">{trade.contact}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          When contacting the trader, please mention that you found their listing on Swapify. Be respectful and trade safely.
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