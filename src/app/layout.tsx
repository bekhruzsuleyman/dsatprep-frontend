import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: 'DSAT AI Solver – Analyze Questions, Traps & Improve Your Score',
  description: 'Get 1500+ on DSAT with AI Trap Analysis | DSAT Prep AI',
  openGraph: {
    title: "DSAT AI Solver",
    description: "Solve DSAT questions with trap analysis and score improvement strategies.",
    url: "https://dsatprep-frontend.vercel.app",
    siteName: "DSAT Prep AI",
    type: "website",
  },
}
export default function RootLayout({children,}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
