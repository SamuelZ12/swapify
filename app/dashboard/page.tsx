import { createClient } from "@/utils/supabase/server";
import { MarketplaceItemsGrid } from "@/components/marketplace/marketplace-items-grid";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/marketplace/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Swapify</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Skill Exchange</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">
            <div className="mb-8 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Skill Exchange</h1>
              <p className="text-lg text-muted-foreground">
                Connect with fellow students to trade skills and knowledge. Share what you know, learn what you don't.
              </p>
            </div>
            <MarketplaceItemsGrid />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
