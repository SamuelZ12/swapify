"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { ImageUpload } from "@/components/forms/image-upload";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["Academic", "Creative", "Fitness", "Other"]),
  skillTags: z.array(z.string()).min(1, "At least one skill tag is required"),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  availability: z.string().min(1, "Availability is required"),
  contact: z.string().min(1, "Contact information is required"),
  image_url: z.string().min(1, "Image is required"),
  location: z.string().min(1, "Location is required"),
  tradePreferences: z.array(z.string()).optional(),
});

type PostItemFormProps = {
  onSuccess: () => void;
  initialData?: z.infer<typeof formSchema>;
};

export function PostItemForm({ onSuccess, initialData }: PostItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [newSkillTag, setNewSkillTag] = useState("");
  const [newTradePreference, setNewTradePreference] = useState("");
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      category: "Academic",
      skillTags: [],
      skillLevel: "Beginner",
      availability: "",
      contact: "",
      image_url: "",
      location: "",
      tradePreferences: [],
    },
  });

  const addSkillTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newSkillTag.trim()) {
      e.preventDefault();
      const currentTags = form.getValues("skillTags");
      if (!currentTags.includes(newSkillTag.trim())) {
        form.setValue("skillTags", [...currentTags, newSkillTag.trim()]);
      }
      setNewSkillTag("");
    }
  };

  const removeSkillTag = (tagToRemove: string) => {
    const currentTags = form.getValues("skillTags");
    form.setValue(
      "skillTags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const addTradePreference = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTradePreference.trim()) {
      e.preventDefault();
      const currentPrefs = form.getValues("tradePreferences") || [];
      if (!currentPrefs.includes(newTradePreference.trim())) {
        form.setValue("tradePreferences", [...currentPrefs, newTradePreference.trim()]);
      }
      setNewTradePreference("");
    }
  };

  const removeTradePreference = (prefToRemove: string) => {
    const currentPrefs = form.getValues("tradePreferences") || [];
    form.setValue(
      "tradePreferences",
      currentPrefs.filter((pref) => pref !== prefToRemove)
    );
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      if (initialData) {
        const { error } = await supabase
          .from("marketplace_items")
          .update({
            ...values,
            user_id: user.id,
          })
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("marketplace_items")
          .insert({
            ...values,
            user_id: user.id,
            created_at: new Date().toISOString(),
            rating: 0,
          });

        if (error) throw error;
      }

      form.reset();
      onSuccess();
    } catch (error: any) {
      console.error("Error posting/updating trade:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={loading}
                />
              </FormControl>
              <FormDescription>
                Add a photo that represents your skill or trade offering
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="What skill are you offering?" 
                    {...field} 
                    disabled={loading} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your skill and what you can teach others..."
                  className="resize-none"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="skillLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="When are you available?" 
                    {...field} 
                    disabled={loading} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="skillTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Tags</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    placeholder="Add skill tags (press Enter)"
                    value={newSkillTag}
                    onChange={(e) => setNewSkillTag(e.target.value)}
                    onKeyDown={addSkillTag}
                    disabled={loading}
                  />
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeSkillTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Add relevant tags to help others find your skill (e.g., "Python", "Graphic Design")
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tradePreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trade Preferences</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    placeholder="What skills are you looking for? (press Enter)"
                    value={newTradePreference}
                    onChange={(e) => setNewTradePreference(e.target.value)}
                    onKeyDown={addTradePreference}
                    disabled={loading}
                  />
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((pref) => (
                      <Badge key={pref} variant="outline" className="gap-1">
                        {pref}
                        <button
                          type="button"
                          onClick={() => removeTradePreference(pref)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                List skills you'd like to learn in exchange
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Where are you located?" 
                    {...field} 
                    disabled={loading} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Information</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="How can people reach you?" 
                    {...field} 
                    disabled={loading} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (initialData ? "Updating..." : "Posting...") : (initialData ? "Update Trade" : "Post Trade")}
        </Button>
      </form>
    </Form>
  );
} 