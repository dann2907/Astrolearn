import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: "AstroLearn - Penjelajah Tata Surya",
  description: "Belajar Astronomi jadi lebih seru, interaktif, dan menyenangkan!",
  openGraph: {
    title: "AstroLearn - Penjelajah Tata Surya",
    description: "Platform edukasi astronomi interaktif dengan gamifikasi RPG.",
    url: "https://astrolearn.vercel.app", // Adjust if needed
    siteName: "AstroLearn",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AstroLearn Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroLearn - Penjelajah Tata Surya",
    description: "Belajar Astronomi jadi lebih seru, interaktif, dan menyenangkan!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
