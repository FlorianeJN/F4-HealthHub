import { ThemeProvider } from "@/components/theme-provider";
import { frFR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-day-picker/dist/style.css";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F4 HealthHub",
  description:
    "F4 HealthHub est un logiciel de gestion visant à aider les agences de placement à gérer leur personnel, leurs partenaires, leurs factures, et bien plus encore!",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={frFR} afterSignOutUrl="/">
      <html lang="fr" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <div id="modal-root" />
            <ToastContainer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
