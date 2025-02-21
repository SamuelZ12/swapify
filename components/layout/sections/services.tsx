import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface ServiceProps {
  title: string;
  icon: string;
  description: string;
  popularSkills: string[];
  color: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Academic Support",
    icon: "GraduationCap",
    description:
      "Exchange tutoring services across different subjects. Help others while strengthening your own understanding.",
    popularSkills: ["Calculus", "Data Structures", "Physics", "Economics"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Technical Skills",
    icon: "Code",
    description:
      "Trade programming knowledge, development expertise, and technical mentorship with fellow students.",
    popularSkills: ["Python", "React", "Machine Learning", "Web Dev"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Creative Arts",
    icon: "Palette",
    description:
      "Share your artistic talents, from digital design to music lessons and photography skills.",
    popularSkills: ["UI/UX", "Graphic Design", "Music", "Photography"],
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Professional Development",
    icon: "Briefcase",
    description:
      "Exchange career-building skills like resume reviews, interview prep, and networking tips.",
    popularSkills: ["Resume Writing", "Interview Prep", "LinkedIn", "Public Speaking"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Language & Culture",
    icon: "Languages",
    description:
      "Connect with international students to exchange language practice and cultural knowledge.",
    popularSkills: ["Mandarin", "English", "French", "Korean"],
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "Lifestyle & Wellness",
    icon: "Heart",
    description:
      "Trade fitness tips, nutrition advice, and wellness practices for a balanced student life.",
    popularSkills: ["Fitness Training", "Yoga", "Meal Prep", "Meditation"],
    color: "from-pink-500/20 to-rose-500/20",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider uppercase font-semibold">
          Skill Categories
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          What Would You Like to Trade?
        </h2>
        
        <p className="md:w-2/3 mx-auto text-xl text-center text-muted-foreground">
          Discover the diverse range of skills being exchanged on Swapify. Whether you're looking to learn or share your expertise, there's something for everyone.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceList.map(({ title, icon, description, popularSkills, color }) => (
          <Card
            key={title}
            className="bg-background border border-primary/10 shadow-lg hover:shadow-xl transition-all overflow-hidden group"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${color} transition-opacity -z-10`} />
            
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Popular Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button className="bg-primary/10 hover:bg-primary/20 text-primary">
          View All Categories
        </Button>
      </div>
    </section>
  );
};
