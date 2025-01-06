import { createClient } from "@/utils/supabase/server";
import { ReadingEntryForm } from "../../components/reading-entry-form";
import { ReadingEntriesList } from "../../components/reading-entries-list";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Reading Log</h1>
        <div className="space-y-8">
          <ReadingEntryForm />
          <ReadingEntriesList />
        </div>
      </div>
    </div>
  );
}
