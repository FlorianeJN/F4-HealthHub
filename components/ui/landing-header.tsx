"use client";

import { useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export function LandingHeader() {
  const { isSignedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-slate-900">F4 HealthHub</span>
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {isSignedIn ? (
            <Link href="/dashboard">
              <button className="inline-flex items-center justify-center rounded-md bg-[#396CFF] px-4 py-2 text-sm font-medium text-white hover:bg-[#2F5FE0] hover:cursor-pointer">
                Accéder à l&apos;application
              </button>
            </Link>
          ) : (
            <>
              <SignIn
                label="Connexion"
                className="bg-white text-[#396CFF] border border-[#396CFF] hover:bg-[#396CFF]/10"
              />
              <SignUp
                label="Inscription"
                className="bg-[#396CFF] text-white hover:bg-[#2F5FE0]"
              />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#396CFF] hover:bg-slate-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3">
          {isSignedIn ? (
            <Link href="/dashboard">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-md bg-[#396CFF] px-4 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-[#2F5FE0] "
              >
                Accéder à l&apos;application
              </button>
            </Link>
          ) : (
            <>
              <SignIn
                label="Connexion"
                className="w-full bg-white text-[#396CFF] border border-[#396CFF] hover:cursor-pointer hover:bg-[#396CFF]/10"
              />
              <SignUp
                label="Inscription"
                className="w-full bg-[#396CFF] hover:bg-[#2F5FE0] hover:cursor-pointer text-white"
              />
            </>
          )}
        </div>
      )}
    </header>
  );
}
