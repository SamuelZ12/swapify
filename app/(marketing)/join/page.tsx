import { JoinWaitlistForm } from "@/components/forms/join-waitlist-form";

export const metadata = {
  title: "Join Waitlist - Early Access",
  description: "Join our waitlist to get early access to our platform",
};

export default function JoinPage() {
  return (
    <div className="container max-w-screen-md mx-auto py-16 md:py-24">
      <div className="text-center space-y-4 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Join Our{" "}
          <span className="text-transparent bg-gradient-to-r from-[#E2725B] to-primary bg-clip-text">
            Waitlist
          </span>
        </h1>
      </div>
      
      <div className="max-w-md mx-auto">
        <p className="text-center text-lg text-muted-foreground mb-8">
        Join the waitlist to get early access and we'll notify you when you're invited!
        </p>
        <JoinWaitlistForm />
      </div>
    </div>
  );
} 