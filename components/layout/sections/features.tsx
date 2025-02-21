import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "UserCheck",
    title: "Verified UW Community",
    description:
      "Connect with verified University of Waterloo students. Build trust through our comprehensive verification system.",
  },
  {
    icon: "Handshake",
    title: "Skill Matching",
    description:
      "Our smart algorithm matches you with students who have complementary skills. Find the perfect trading partner effortlessly.",
  },
  {
    icon: "MessageSquare",
    title: "In-App Chat",
    description:
      "Discuss trade details securely through our built-in messaging system. Share files and coordinate meetups safely.",
  },
  {
    icon: "Star",
    title: "Trust & Ratings",
    description:
      "Build your reputation through our rating system. Higher ratings unlock premium features and trading opportunities.",
  },
  {
    icon: "Shield",
    title: "Secure Trading",
    description:
      "Trade with confidence using our structured exchange system. Clear guidelines and dispute resolution ensure fair trades.",
  },
  {
    icon: "Users",
    title: "Community Groups",
    description:
      "Join subject-specific groups to find study partners, share resources, and organize skill-sharing workshops.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider uppercase font-semibold">
        Platform Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Trade Skills with Confidence
      </h2>

      <h3 className="md:w-2/3 mx-auto text-xl text-center text-muted-foreground mb-12">
        Swapify provides all the tools you need to safely exchange skills and services
        within the UW community. No money needed - just your talents and time.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-card/50 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-3 rounded-2xl ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={28}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
