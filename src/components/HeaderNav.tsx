"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderNav(){
  const pathname = usePathname();
  const link = (href:string,label:string)=>{
    const active = pathname === href;
    return (
      <Link href={href} className={`px-4 py-2 text-sm font-medium ${active ? "text-teal-600" : "text-gray-700 hover:text-teal-600"}`}>
        {label}
      </Link>
    );
  };
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-narrow flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl">Monet</Link>
        <nav className="hidden md:flex items-center gap-1">
          {link("/experts","Experts")}
          {link("/calendar","Calendar")}
          {link("/history","History")}
          {link("/how-it-works","How It Works")}
        </nav>
        <div className="flex items-center gap-2">
+          <Link href="/sign-in" className="px-4 py-2 text-sm font-medium text-gray-700">Log In</Link>
+          <Link href="/sign-up" className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
