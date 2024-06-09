import { Inter } from "next/font/google";
import "./globals.css";
import SnackbarProvider from "@/context/SnackbarProvider";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
