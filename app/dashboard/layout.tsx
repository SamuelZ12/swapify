import { DashboardNavbar } from "@/components/layout/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 container">{children}</div>
      </div>
    </div>
  );
} 