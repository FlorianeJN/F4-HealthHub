"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "./button";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export default function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b bg-white fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-slate-900">
            F4 HealthHub
          </span>
        </div>

        {/* Desktop nav (≥640px) */}
        <nav className="hidden sm:flex sm:items-center sm:space-x-4">
          <SignedOut>
            <SignIn label="Se connecter" />
            <SignUp label="S'inscrire" />
          </SignedOut>
          <SignedIn>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/dashboard"
            >
              Go to Dashboard
            </Link>
            <UserButton />
          </SignedIn>
        </nav>

        {/* Animated Hamburger Toggle */}
        <button
          className="sm:hidden p-2 rounded-md focus:outline-none focus:ring"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <motion.div
            key={mobileOpen ? "close" : "open"}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: mobileOpen ? 90 : 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Sliding Mobile Panel */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            className="sm:hidden border-t bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              <SignedOut>
                <SignIn label="Se connecter" />
                <SignUp label="S'inscrire" />
              </SignedOut>
              <SignedIn>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href="/dashboard"
                >
                  Go to Dashboard
                </Link>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
