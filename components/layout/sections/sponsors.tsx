"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";
interface sponsorsProps {
  icon: string;
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "GraduationCap",
    name: "UW Engineering Society",
  },
  {
    icon: "Code2",
    name: "Waterloo Blockchain",
  },
  {
    icon: "Rocket",
    name: "Velocity",
  },
  {
    icon: "Users",
    name: "WUSA",
  },
  {
    icon: "Laptop2",
    name: "Computer Science Club",
  },
  {
    icon: "Palette",
    name: "UW Design Club",
  },
  {
    icon: "Building2",
    name: "Conrad School",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6 text-muted-foreground">
        Trusted by UW Organizations
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              <Icon
                name={icon as keyof typeof icons}
                size={32}
                color="currentColor"
                className="mr-2 text-primary"
              />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
