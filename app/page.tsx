import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Filter, Search, Clock } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Track Your Reading Journey
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                A minimalist reading log to help you track, organize, and reflect on your reading habits.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Easy Logging</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Quickly log your reading with title, author, type, and progress tracking.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Filter className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Organization</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Filter and organize your readings by type, status, and completion date.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Quick Search</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Find any book or article in your reading history instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple. Powerful. Beautiful.
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Experience a clean, distraction-free interface designed for readers.
              </p>
            </div>
            {/* Mock UI Preview */}
            <div className="w-full max-w-4xl mt-8 rounded-lg border bg-background p-4 shadow-lg">
              <div className="space-y-8">
                <div className="h-[300px] rounded-lg bg-muted/60 flex items-center justify-center">
                  <p className="text-sm text-gray-500">App interface preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
