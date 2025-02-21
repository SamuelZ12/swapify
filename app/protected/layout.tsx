import { ProtectedNavbar } from "@/components/layout/protected-navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ProtectedNavbar />
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  );
} 