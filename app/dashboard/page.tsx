import { createClient } from "@/utils/supabase/server";
import { MarketplaceItemsGrid } from "@/components/marketplace-items-grid";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <MarketplaceItemsGrid />
    </div>
  );
} 