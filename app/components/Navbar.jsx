"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/Projects", label: "Projects" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-md">
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-14 sm:h-16 flex items-center justify-center">
          <ul className="flex items-center gap-6 sm:gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm sm:text-base font-medium transition-colors duration-150 ${
                      active
                        ? "text-white underline underline-offset-4 decoration-purple-400"
                        : "text-slate-200 hover:text-white hover:underline underline-offset-4"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
