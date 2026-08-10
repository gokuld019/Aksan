"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      setReady(true);
    }
  }, [isLoginPage, router]);

  if (isLoginPage) return children;
  if (!ready) return null;

  const handleLogout = async () => {
    setLoggingOut(true);
    const token = localStorage.getItem("token");

    try {
      await fetch("https://api.crazystory.in/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    } catch (err) {
      // even if the API call fails, still clear local session
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/admin/login");
    }
  };

  const linkClass = (href) =>
    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      pathname.startsWith(href)
        ? "bg-[#c5a059]/10 text-[#8a6d2f]"
        : "text-[#71768a] hover:bg-[#f7f4ee] hover:text-[#0b1220]"
    }`;

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-[#ece8dc] flex flex-col p-6">
        <div className="mb-9">
          <Image
            src="/bluelogo.webp"
            alt="AKSAN Capital Advisory"
            width={160}
            height={56}
            className="h-10 w-auto"
            priority
          />
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <p className="text-[#a3a7b3] text-[11px] font-semibold uppercase tracking-wider px-3.5 mb-1">
            Menu
          </p>
          <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            Dashboard
          </Link>
          <Link href="/admin/blogs" className={linkClass("/admin/blogs")}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            Blogs
          </Link>
        </nav>

        <div className="pt-5 border-t border-[#ece8dc]">
          {user && (
            <div className="flex items-center gap-3 px-1 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8a6d2f] flex items-center justify-center text-white text-xs font-semibold">
                {user.name?.charAt(0) || "A"}
              </div>
              <div className="min-w-0">
                <p className="text-[#0b1220] text-sm font-medium truncate">{user.name}</p>
                <p className="text-[#a3a7b3] text-xs truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full border border-[#ece8dc] text-[#71768a] py-2.5 rounded-lg text-[13px] font-medium hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loggingOut ? "Logging out…" : "Log out"}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 shrink-0 bg-white border-b border-[#ece8dc] flex items-center justify-between px-8">
          <p className="text-[#a3a7b3] text-xs">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          <div className="flex items-center gap-2 text-[#71768a] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            SEBI-Registered Investment Advisor
          </div>
        </header>

        <main className="flex-1 p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}