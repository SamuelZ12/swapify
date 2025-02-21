"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: "Books" | "Electronics" | "Clothing" | "Other";
  condition: "New" | "Like New" | "Good" | "Fair";
  location: string;
  contact: string;
  user_id: string;
  created_at: string;
};

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

export function MarketplaceItemsList() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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
    const { error } = await supabase
      .from("marketplace_items")
      .delete()
      .match({ id });

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      fetchItems();
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesCondition = conditionFilter === "all" || item.condition === conditionFilter;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
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
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading items...
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => deleteItem(item.id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 