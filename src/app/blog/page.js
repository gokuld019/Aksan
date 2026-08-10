// app/blog/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getPublishedBlogs, getFeaturedBlogs } from "@/lib/blogApi";

export default function PublicBlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getPublishedBlogs({ page, per_page: 10, search });
      const root = response?.data ?? response;
      const list = Array.isArray(root?.data) ? root.data : Array.isArray(root) ? root : [];
      setBlogs(list);
      setMeta({
        currentPage: root?.current_page ?? 1,
        lastPage: root?.last_page ?? 1,
        total: root?.total ?? list.length,
      });
    } catch (err) {
      setError(err.message || "Could not load blogs.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    getFeaturedBlogs()
      .then((response) => {
        const list = Array.isArray(response?.data) ? response.data : [];
        setFeatured(list);
      })
      .catch((err) => console.error("[getFeaturedBlogs] failed:", err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-[#0b1220] text-3xl font-semibold mb-8">Blog</h1>

      {featured.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[#0b1220] text-lg font-semibold mb-4">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="block bg-white border border-[#ece8dc] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {blog.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={blog.image_url} alt={blog.title} className="w-full h-36 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-[#0b1220] text-sm font-semibold line-clamp-2">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blogs…"
          className="flex-1 bg-white border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
        />
        <button
          type="submit"
          className="bg-[#f7f4ee] border border-[#ece8dc] text-[#71768a] px-4 rounded-lg text-sm hover:bg-[#ece8dc] transition-colors"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-2.5 rounded-lg mb-5">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-[#71768a] text-sm py-12">Loading…</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-[#71768a] text-sm py-12">No blogs found.</div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="flex gap-4 bg-white border border-[#ece8dc] rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              {blog.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-28 h-20 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div>
                <h3 className="text-[#0b1220] text-base font-semibold mb-1">{blog.title}</h3>
                <p className="text-[#71768a] text-sm line-clamp-2">{blog.description}</p>
                <p className="text-[#71768a] text-xs mt-2">
                  {blog.author}
                  {blog.published_at &&
                    ` · ${new Date(blog.published_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {meta && meta.lastPage > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-[#0b1220] text-sm px-3 py-1.5 rounded-lg bg-white border border-[#ece8dc] disabled:opacity-40 hover:bg-[#f7f4ee] transition-colors"
          >
            Prev
          </button>
          <span className="text-[#71768a] text-sm">
            Page {meta.currentPage} of {meta.lastPage} · {meta.total} total
          </span>
          <button
            onClick={() => setPage((p) => Math.min(meta.lastPage, p + 1))}
            disabled={page === meta.lastPage}
            className="text-[#0b1220] text-sm px-3 py-1.5 rounded-lg bg-white border border-[#ece8dc] disabled:opacity-40 hover:bg-[#f7f4ee] transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}