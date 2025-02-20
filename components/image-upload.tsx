"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const uploadImage = useCallback(
    async (file: File) => {
      try {
        setUploading(true);

        // Generate a unique file name
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `item-images/${fileName}`;

        // Upload the file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("marketplace")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from("marketplace")
          .getPublicUrl(filePath);

        onChange(publicUrl);
      } catch (error: any) {
        console.error("Error uploading image:", error.message);
        alert("Error uploading image. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [supabase, onChange]
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB");
          return;
        }
        uploadImage(file);
      }
    },
    [uploadImage]
  );

  const handleRemove = useCallback(() => {
    onChange("");
  }, [onChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        {value ? (
          <div className="relative aspect-square w-full max-w-[400px]">
            <Image
              src={value}
              alt="Item preview"
              fill
              className="object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
              disabled={disabled || uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or WebP (MAX. 5MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileSelect}
              disabled={disabled || uploading}
            />
          </label>
        )}
      </div>
      {uploading && (
        <div className="text-sm text-muted-foreground text-center">
          Uploading...
        </div>
      )}
    </div>
  );
} 