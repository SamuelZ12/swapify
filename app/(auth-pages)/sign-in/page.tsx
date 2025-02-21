import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-semibold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-base">
            Don't have an account?{" "}
            <Link className="text-primary hover:underline font-medium transition-colors" href="/sign-up">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid gap-6">
            <GoogleSignInButton />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form className="grid gap-5">
              <div className="grid gap-3">
                <Label className="text-base" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  className="h-11"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base" htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  required
                  className="h-11"
                />
              </div>
              <SubmitButton
                className="w-full h-11 text-base"
                pendingText="Signing in..."
                formAction={signInAction}
              >
                Sign in
              </SubmitButton>
              <FormMessage message={searchParams} />
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
