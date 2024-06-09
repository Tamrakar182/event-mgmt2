import { Inter } from "next/font/google";
import "./globals.css";
import SnackbarProvider from "@/context/SnackbarProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
