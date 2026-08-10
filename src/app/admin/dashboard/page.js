// app/admin/dashboard/page.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const user = typeof window !== "undefined" ? getUser() : null;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#0b1220] text-2xl font-semibold">Dashboard</h1>
          {user?.name && (
            <p className="text-[#71768a] text-sm mt-1">Welcome back, {user.name}</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="text-[#71768a] text-sm hover:text-[#0b1220] border border-[#ece8dc] rounded-lg px-4 py-2 hover:bg-[#f7f4ee] transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/blogs"
          className="bg-white border border-[#ece8dc] rounded-2xl p-6 hover:border-[#c5a059] transition-colors hover:shadow-lg"
        >
          <div className="text-3xl mb-2">📝</div>
          <h2 className="text-[#0b1220] text-lg font-semibold">Manage Blogs</h2>
          <p className="text-[#71768a] text-sm mt-1">View and manage all blog posts</p>
        </Link>

        {/* The blogs page handles "create" as an internal view (?view=create isn't
            used — it's local component state), so this deep-links there and the
            page can pick up a ?new=1 flag if you want it to auto-open the form. */}
        <Link
          href="/admin/blogs?new=1"
          className="bg-white border border-[#ece8dc] rounded-2xl p-6 hover:border-[#c5a059] transition-colors hover:shadow-lg"
        >
          <div className="text-3xl mb-2">✍️</div>
          <h2 className="text-[#0b1220] text-lg font-semibold">Create Blog</h2>
          <p className="text-[#71768a] text-sm mt-1">Write a new blog post</p>
        </Link>

        <div className="bg-white border border-[#ece8dc] rounded-2xl p-6">
          <div className="text-3xl mb-2">📊</div>
          <h2 className="text-[#0b1220] text-lg font-semibold">Analytics</h2>
          <p className="text-[#71768a] text-sm mt-1">Coming soon</p>
        </div>
      </div>
    </div>
  );
}