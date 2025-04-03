import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar"
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/GetCurrentUser";

const font = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Locafy",
  description: "Locafy Web Project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="pt-br">
      <body
        className={`${font.variable} antialiased`}>
          <ClientOnly>
            <ToasterProvider/>
            <LoginModal/>
            <RegisterModal/>
            <Navbar currentUser={currentUser ?? undefined} />
          </ClientOnly>
        {children}
      </body>
    </html>
  );
}
