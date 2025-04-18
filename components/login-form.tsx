import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* LEFT SIDE: Clerk SignIn only */}
          <div className="p-6 md:p-8 flex">
            <SignIn
              routing="path"
              path="/sign-in"
              appearance={{
                elements: {
                  // make the form fill the container
                  card: "w-full h-full",
                  form: "w-full",
                },
                variables: {
                  fontSize: "1rem",
                  spacingUnit: "0.75rem",
                },
              }}
            />
          </div>

          {/* RIGHT SIDE: Illustration */}
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/nurse.png"
              alt="An illustration of a nurse"
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        En cliquant sur Continuer, vous acceptez{" "}
        <Link href="/terms">nos Conditions d&apos;utilisation</Link> et notre{" "}
        <Link href="/privacy">Politique de confidentialité.</Link>
      </p>
    </div>
  );
}
