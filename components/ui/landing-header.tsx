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
      <div className="container flex h-14 items-center">
        <div className="mr-4 px-52 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-slate-900">
              F4 HealthHub
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isSignedIn ? (
            <Link href="/dashboard">
              <button className="inline-flex items-center justify-center rounded-md bg-[#396CFF] px-4 py-2 text-sm font-medium text-white hover:bg-[#2F5FE0]">
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
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#396CFF] hover:bg-slate-100 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Ouvrir le menu</span>
          {mobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-3">
            <SignIn
              label="Connexion"
              className="w-full bg-white text-[#396CFF] border border-[#396CFF] hover:bg-[#396CFF]/10"
            />
            <SignUp
              label="Inscription"
              className="w-full bg-[#396CFF] hover:bg-[#2F5FE0] text-white"
            />
          </div>
        </div>
      )}
    </header>
  );
}
