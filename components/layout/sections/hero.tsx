"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gradientClass = mounted && theme === "dark" 
    ? "from-[#E2725B] to-primary"
    : "from-[#F1B4A9] to-primary";

  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> Design is out now! </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Trade Skills,
              <span
                className={cn(
                  "text-transparent px-2 bg-gradient-to-r bg-clip-text",
                  gradientClass
                )}
              >
                Not Money
              </span>
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`Swapify connects University of Waterloo students to exchange skills, services, and resources. Learn Python, trade design skills, or find study partners - all without spending a dime.`}
          </p>

          <div className="space-y-4 md:space-y-0">
            <Button asChild className="w-5/6 md:w-1/4 font-bold group/arrow">
              <Link href="/sign-up">
                Get Started
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <div className="relative">
            <Image
              width={1200}
              height={1200}
              className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
              src="/hero-image-light.png"
              alt="dashboard"
              priority
            />
            {mounted && theme === 'dark' && (
              <Image
                width={1200}
                height={1200}
                className="w-full md:w-[1200px] mx-auto rounded-lg absolute inset-0 transition-opacity duration-200"
                src="/hero-image-dark.png"
                alt="dashboard"
                priority
              />
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};