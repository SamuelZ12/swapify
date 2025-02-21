import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "GraduationCap",
    title: "Learn New Skills",
    description:
      "Access peer-to-peer tutoring and skill workshops. Learn from experienced students in programming, design, music, and more.",
  },
  {
    icon: "PiggyBank",
    title: "Save Money",
    description:
      "Trade your skills instead of spending money. Perfect for budget-conscious students looking to learn and grow without financial strain.",
  },
  {
    icon: "Users",
    title: "Build Connections",
    description:
      "Network with fellow students across faculties. Form study groups, find project partners, and make friends with shared interests.",
  },
  {
    icon: "Trophy",
    title: "Gain Experience",
    description:
      "Build your portfolio by helping others. Get real-world experience and references for your resume while studying.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock Your Potential Through Skill Trading
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            As a UW student, you have valuable skills to share. Join Swapify to trade
            your expertise, learn from peers, and build meaningful connections - all
            while saving money.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
