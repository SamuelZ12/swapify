"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  program: string;
  comment: string;
  rating: number;
  skillsTraded: string[];
}

const reviewList: ReviewProps[] = [
  {
    image: "/avatars/sarah.jpg",
    name: "Sarah Chen",
    program: "3B Computer Science",
    comment:
      "I traded Python tutoring for UI/UX design lessons. Not only did I improve my design skills, but I also made a great friend who's now my hackathon partner!",
    rating: 5.0,
    skillsTraded: ["Python", "UI/UX Design"],
  },
  {
    image: "/avatars/mike.jpg",
    name: "Mike Patel",
    program: "4A Systems Design",
    comment:
      "Found a study group for my algorithms course and traded my React knowledge for help with dynamic programming. Swapify made exam prep so much easier!",
    rating: 4.9,
    skillsTraded: ["React", "Algorithms"],
  },
  {
    image: "/avatars/emma.jpg",
    name: "Emma Wilson",
    program: "2B Arts & Business",
    comment:
      "As an arts student learning to code, I traded my digital marketing expertise for web development mentorship. Now I'm building my own portfolio website!",
    rating: 5.0,
    skillsTraded: ["Marketing", "Web Dev"],
  },
  {
    image: "/avatars/david.jpg",
    name: "David Kim",
    program: "3A Mechatronics",
    comment:
      "Traded CAD modeling help for guitar lessons. It's amazing how many talented musicians we have at UW! Now I can code and play music during my study breaks.",
    rating: 4.8,
    skillsTraded: ["CAD", "Music"],
  },
  {
    image: "/avatars/priya.jpg",
    name: "Priya Sharma",
    program: "4B Mathematics",
    comment:
      "Used Swapify to find a language exchange partner. I helped with calculus while learning Mandarin! Perfect for both academic and personal growth.",
    rating: 5.0,
    skillsTraded: ["Math", "Languages"],
  },
  {
    image: "/avatars/alex.jpg",
    name: "Alex Thompson",
    program: "2A Environmental Studies",
    comment:
      "Connected with a CS student who needed help with sustainability research. I got Python automation skills, and they got expert insights for their project!",
    rating: 4.9,
    skillsTraded: ["Research", "Python"],
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          From Students Like You
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 pb-4">
                    <div className="flex gap-1">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <Star key={i} className="size-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {review.skillsTraded.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{review.comment}"</p>
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.program}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
