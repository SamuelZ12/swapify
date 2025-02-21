import { icons } from "lucide-react";

export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  name: keyof typeof icons;
  color: string;
  size: number;
  className?: string;
}) => {
  // Convert PascalCase to kebab-case and then back to PascalCase
  const normalizedName = name
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase()
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") as keyof typeof icons;

  const LucideIcon = icons[normalizedName];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};
