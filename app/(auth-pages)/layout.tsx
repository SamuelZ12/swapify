export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full grid place-items-center bg-grid-pattern">
      <div className="w-full px-4 py-8 sm:px-0">{children}</div>
    </div>
  );
}
