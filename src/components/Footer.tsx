import Link from "next/link";

export default function Footer(){
  return (
    <footer className="border-t border-[var(--border)] mt-12">
      <div className="container-narrow py-10 text-sm text-[var(--muted)] flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start justify-between">
        <div className="space-y-2">
          <div className="font-semibold text-[var(--text)]">Monet</div>
          <p>© {new Date().getFullYear()} Monet. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <div className="space-y-2">
            <div className="font-medium text-[var(--text)]">Product</div>
            <ul className="space-y-1">
              <li><Link href="/browse">Browse</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/how-it-works">How it works</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-[var(--text)]">Legal</div>
            <ul className="space-y-1">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
