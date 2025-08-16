"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({role}:{role:"candidate"|"professional"}){
  const p = usePathname();
  const base = role==="candidate" ? "/candidate" : "/pro";
  const links = role==="candidate"
    ? [
        ["Dashboard","/dashboard"],
        ["Requests","/requests"],
        ["Payments","/payments"],
        ["Receipts","/receipts"],
      ]
    : [
        ["Dashboard","/dashboard"],
        ["Requests","/requests"],
        ["Feedback","/feedback"],
        ["Earnings","/earnings"],
        ["Settings","/settings"],
      ];
  return (
    <aside className="w-64 shrink-0 bg-[var(--surface)] rounded-2xl p-3 h-fit sticky top-24">
      <div className="space-y-1">
        {links.map(([label,href])=>{
          const full = `${base}${href}`;
          const active = p===full;
          return (
            <Link key={full} href={full} className={`sidebar-link ${active?"active":""}`}>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
