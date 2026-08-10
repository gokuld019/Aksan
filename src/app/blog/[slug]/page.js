// app/blog/[slug]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug } from "@/lib/blogApi";

export default function PublicBlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");
    getBlogBySlug(slug)
      .then((response) => {
        if (response?.success && response.data) {
          setBlog(response.data);
        } else {
          throw new Error(response?.message || "Blog not found.");
        }
      })
      .catch((err) => setError(err.message || "Blog not found."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="text-center text-[#71768a] text-sm py-16">Loading…</div>;
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600 text-sm mb-4">{error || "Blog not found."}</p>
        <Link href="/blog" className="text-[#c5a059] hover:underline text-sm">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-[#71768a] hover:text-[#0b1220] text-sm transition-colors">
        ← Back to blog
      </Link>

      <h1 className="text-[#0b1220] text-3xl font-semibold mt-4 mb-2">{blog.title}</h1>
      <p className="text-[#71768a] text-sm mb-6">
        {blog.author}
        {blog.published_at &&
          ` · ${new Date(blog.published_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}`}
      </p>

      {blog.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-2xl mb-8"
        />
      )}

      <div
        className="prose max-w-none text-[#0b1220]"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}