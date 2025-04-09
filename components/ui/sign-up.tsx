import { SignUpButton } from "@clerk/nextjs";
import { ComponentPropsWithoutRef } from "react";
import { Button } from "./button";

type SignInProps = {
  label: string;
} & ComponentPropsWithoutRef<"button">;

export default function SignUp({ label, className }: SignInProps) {
  return (
    <SignUpButton>
      <Button className={`hover:cursor-pointer ${className}`}>{label}</Button>
    </SignUpButton>
  );
}
