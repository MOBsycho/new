// Root Layout with Loading Support
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "KuberJi Mandir - Pandukeshwar",
  description: "Ancient temple dedicated to Lord Kuber in Pandukeshwar, Uttarakhand. Experience divine blessings and sacred rituals.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative font-rubik">
        <LanguageProvider>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
