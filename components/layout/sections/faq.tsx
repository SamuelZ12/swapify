import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How do I verify my UW student status?",
    answer: "Simply sign up with your @uwaterloo.ca email address. You'll receive a verification link to confirm your student status. Once verified, you can start trading skills immediately!",
    value: "item-1",
  },
  {
    question: "What happens if a skill trade doesn't work out?",
    answer: "We have a comprehensive dispute resolution system. Both parties can rate and review their experience. If there are issues, our moderation team will help mediate the situation. Multiple negative reviews may result in account restrictions.",
    value: "item-2",
  },
  {
    question: "Can I trade skills with students from other faculties?",
    answer: "Absolutely! Swapify encourages interdisciplinary exchanges. Many of our most successful trades happen between students from different programs, like CS students trading with Arts students or Engineering students trading with Math students.",
    value: "item-3",
  },
  {
    question: "How does the rating system work?",
    answer: "After each trade, both participants can rate their experience from 1-5 stars and leave a review. Your overall rating is an average of your received ratings. Higher ratings unlock premium features and increase your visibility in search results.",
    value: "item-4",
  },
  {
    question: "Is it safe to meet for in-person skill trades?",
    answer: "We recommend meeting in public campus locations like MC, DC, or SLC for in-person trades. Always use our in-app chat to coordinate and keep a record of your arrangements. For added safety, you can also opt for virtual trading through video calls.",
    value: "item-5",
  },
  {
    question: "What are the most popular skills being traded?",
    answer: "Popular trades include: programming languages (Python, Java, React), academic tutoring (Math, Physics, Economics), creative skills (UI/UX, Graphic Design, Music), and language exchange. The variety grows as more students join the platform!",
    value: "item-6",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[800px] py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider uppercase font-semibold">
          Common Questions
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Everything You Need to Know
        </h2>

        <p className="text-xl text-muted-foreground md:w-2/3 mx-auto">
          Get answers to frequently asked questions about trading skills on Swapify.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem 
            key={value} 
            value={value}
            className="border border-primary/10 rounded-lg mb-4 px-4"
          >
            <AccordionTrigger className="text-left hover:text-primary transition-colors">
              {question}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
