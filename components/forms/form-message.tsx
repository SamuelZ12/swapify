import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20",
            "animate-in fade-in-0 slide-in-from-top-1 duration-300"
          )}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{message.success}</span>
        </div>
      )}
      {"error" in message && (
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive dark:bg-destructive/20",
            "animate-in fade-in-0 slide-in-from-top-1 duration-300"
          )}
        >
          <AlertCircle className="h-4 w-4" />
          <span>{message.error}</span>
        </div>
      )}
      {"message" in message && (
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-md bg-muted text-muted-foreground",
            "animate-in fade-in-0 slide-in-from-top-1 duration-300"
          )}
        >
          <span>{message.message}</span>
        </div>
      )}
    </div>
  );
}
