"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MessageCircle, Pencil, Trash2, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { PostItemForm } from "@/components/forms/post-item-form";
import { MarketplaceItem, ViewMode } from "./types";

const COLUMN_WIDTHS = {
  TITLE: "w-[200px]",
  PRICE: "w-[100px]",
  CATEGORY: "w-[120px]",
  CONDITION: "w-[120px]",
  LOCATION: "w-[150px]",
  CONTACT: "w-[150px]",
  CREATED_AT: "w-[150px]",
  ACTIONS: "w-[70px]"
} as const;

export function MarketplaceItems() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
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

  async function deleteItem(id: string) {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .delete()
        .match({ id });

      if (error) {
        console.error("Error deleting item:", error);
        alert("Error deleting item. Please try again.");
      } else {
        fetchItems();
      }
    } catch (error: any) {
      console.error("Error deleting item:", error);
      alert("Error deleting item. Please try again.");
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesCondition = conditionFilter === "all" || item.condition === conditionFilter;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  if (loading) {
    return <div className="text-center">Loading items...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:max-w-[300px]"
          />
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Item">Item</SelectItem>
                <SelectItem value="Skill">Skill</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Like New">Like New</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
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
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">
              No items available for trade yet. Be the first to post one!
            </div>
          ) : (
            filteredItems.map((item) => (
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
                        <div className="space-y-4">
                          <PostItemForm onSuccess={fetchItems} initialData={item} />
                          <Button
                            variant="destructive"
                            className="w-full mt-2"
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this item?")) {
                                deleteItem(item.id);
                              }
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Item
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                  {item.price && (
                    <p className="font-medium">{item.price}</p>
                  )}
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
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Contact Details</p>
                          <p className="text-sm text-muted-foreground">{item.contact}</p>
                        </div>
                        {item.location && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-sm text-muted-foreground">{item.location}</p>
                          </div>
                        )}
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
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={COLUMN_WIDTHS.TITLE}>Title</TableHead>
                <TableHead className={COLUMN_WIDTHS.PRICE}>Price</TableHead>
                <TableHead className={COLUMN_WIDTHS.CATEGORY}>Category</TableHead>
                <TableHead className={COLUMN_WIDTHS.CONDITION}>Condition</TableHead>
                <TableHead className={COLUMN_WIDTHS.LOCATION}>Location</TableHead>
                <TableHead className={COLUMN_WIDTHS.CONTACT}>Contact</TableHead>
                <TableHead className={COLUMN_WIDTHS.CREATED_AT}>Posted On</TableHead>
                <TableHead className={COLUMN_WIDTHS.ACTIONS}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className={`${COLUMN_WIDTHS.TITLE} font-medium`}>
                      {item.title}
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    </TableCell>
                    <TableCell className={COLUMN_WIDTHS.PRICE}>{item.price}</TableCell>
                    <TableCell className={COLUMN_WIDTHS.CATEGORY}>{item.category}</TableCell>
                    <TableCell className={COLUMN_WIDTHS.CONDITION}>{item.condition}</TableCell>
                    <TableCell className={COLUMN_WIDTHS.LOCATION}>{item.location}</TableCell>
                    <TableCell className={COLUMN_WIDTHS.CONTACT}>{item.contact}</TableCell>
                    <TableCell className={COLUMN_WIDTHS.CREATED_AT}>
                      {format(new Date(item.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {item.user_id === currentUserId && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
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
                            <div className="space-y-4">
                              <PostItemForm onSuccess={fetchItems} initialData={item} />
                              <Button
                                variant="destructive"
                                className="w-full mt-2"
                                onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this item?")) {
                                    deleteItem(item.id);
                                  }
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Item
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
} 