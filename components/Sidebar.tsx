"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/threats", label: "All Threats", icon: "⚠️" },
    { href: "/threats/new", label: "Report Threat", icon: "➕" },
    { href: "/insights", label: "Insights", icon: "📈" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">BioSec</h1>
        <p className="text-xs text-gray-400">Threat Intelligence</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.href)
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-800 mt-12">
        <p className="text-xs text-gray-500">Version 1.0.0</p>
        <p className="text-xs text-gray-600 mt-1">Frontend Demo</p>
      </div>
    </aside>
  );
}
