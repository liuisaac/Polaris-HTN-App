import type { Metadata } from "next";
import localFont from "next/font/local";
import { Saira, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const saira = Saira({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  variable: "--font-saira",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${saira.variable} ${bebas.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
