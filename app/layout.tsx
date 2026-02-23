import type { Metadata } from "next"; // Added this back so it doesn't error
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Glitters Task Manager", // I updated this for you!
  description: "Organize your life with Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} ${montserrat.variable} antialiased`} 
        suppressHydrationWarning={true}
      >
        {/* We removed the extra text from here */}
        {children}
      </body>
    </html>
  );
}