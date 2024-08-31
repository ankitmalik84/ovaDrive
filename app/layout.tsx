import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContextProvider from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ maxWidth: "2500px", margin: "0 auto" }}
      >
        <AuthContextProvider>
          <ToasterContext />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
