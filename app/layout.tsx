import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContextProvider from "@/app/context/AuthContext";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-background text-foreground`}
        style={{
          maxWidth: "2500px",
          margin: "0 auto",
          backgroundColor: "#212121",
        }}
      >
        <Providers>
          <AuthContextProvider>
            <ToasterContext />
            {children}
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
