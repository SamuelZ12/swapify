import { JoinWaitlistForm } from "@/components/forms/join-waitlist-form";

export const metadata = {
  title: "Join Waitlist - Early Access",
  description: "Join our waitlist to get early access to our platform",
};

export default function JoinPage() {
  return (
    <div className="container max-w-screen-md mx-auto py-16 md:py-24">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Join Our{" "}
          <span className="text-transparent bg-gradient-to-r from-[#E2725B] to-primary bg-clip-text">
            Waitlist
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Be among the first to experience our platform. Sign up for early access and we'll notify you when you're invited.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <JoinWaitlistForm />
      </div>
    </div>
  );
} 