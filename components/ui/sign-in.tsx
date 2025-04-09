import { SignInButton } from "@clerk/nextjs";
import { ComponentPropsWithoutRef } from "react";
import { Button } from "./button";

type SignInProps = {
  label: string;
} & ComponentPropsWithoutRef<"button">;

export default function SignIn({ label, className }: SignInProps) {
  return (
    <SignInButton>
      <Button variant="outline" className={`hover:cursor-pointer ${className}`}>
        {label}
      </Button>
    </SignInButton>
  );
}
