import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";

import "./globals.css";
import { NavBar } from "~/components/navbar";
import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "~/components/theme-provider";
import { Provider } from "./_provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NFTNetball",
  description:"Where Sports Meet Innovation"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="px-8">
            {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
