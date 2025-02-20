import { Button } from "@/components/ui/button";
import { ArrowRight, Laptop, Book, Shirt, Sofa, Trophy, Car } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#0A1A2F] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Shop without spending money
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl dark:text-gray-400">
                Meet people on Swapify to trade for everything from clothing and furniture to houseplants and art
              </p>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-white text-[#0A1A2F] hover:bg-gray-100">
                  <Link href="/sign-up">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/barter-illustration.webp"
                alt="People trading items illustration"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Popular Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <CategoryCard icon={<Laptop className="h-8 w-8" />} title="Electronics" />
            <CategoryCard icon={<Book className="h-8 w-8" />} title="Books" />
            <CategoryCard icon={<Shirt className="h-8 w-8" />} title="Clothing" />
            <CategoryCard icon={<Sofa className="h-8 w-8" />} title="Furniture" />
            <CategoryCard icon={<Trophy className="h-8 w-8" />} title="Sports" />
            <CategoryCard icon={<Car className="h-8 w-8" />} title="Vehicles" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary mb-2 block">HOW IT WORKS</span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Working with Swapify is simple
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="1" 
              title="Sign Up" 
              description="Create your free account and start exploring items" 
            />
            <StepCard 
              number="2" 
              title="Upload Items" 
              description="Click a picture of your item and upload it" 
            />
            <StepCard 
              number="3" 
              title="Trade It" 
              description="Connect with other people and start trading your items!" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Link href={`/items/${title.toLowerCase()}`} className="group">
      <div className="flex flex-col items-center p-6 space-y-4 rounded-lg border bg-card transition-colors hover:bg-accent hover:text-accent-foreground">
        <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20">
          {icon}
        </div>
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
    </Link>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-xl font-bold">{number}</span>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
