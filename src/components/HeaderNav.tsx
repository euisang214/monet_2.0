"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderNav(){
  const pathname = usePathname();
  const link = (href:string,label:string)=>{
    const active = pathname === href;
    return (
      <Link href={href} className={`px-3 py-2 rounded-xl text-sm ${active ? "bg-gray-100" : "hover:bg-gray-100"}`}>
        {label}
      </Link>
    );
  };
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-[var(--border)]">
      <div className="container-narrow flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-lg">Monet</Link>
        <nav className="hidden md:flex items-center gap-1">
          {link("/browse","Browse Professionals")}
          {link("/how-it-works","How It Works")}
          {link("/pricing","Pricing")}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="btn btn-outline">Sign in</Link>
          <Link href="/sign-in?as=candidate" className="btn btn-primary">Sign up</Link>
        </div>
      </div>
    </header>
  );
}
