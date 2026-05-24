import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internship Search | Clone",
  description: "Find your dream internship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F0F7FF] text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
