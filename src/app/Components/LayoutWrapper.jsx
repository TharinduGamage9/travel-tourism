"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Nav />}
      <div className={isAdminPage ? "" : "flex-grow"}>
        {children}
      </div>
      {!isAdminPage && <Footer />}
    </>
  );
}

